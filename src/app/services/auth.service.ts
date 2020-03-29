import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthResponseData } from '../models/AuthResponseData';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly LOCALSTORAGE_USER_KEY = 'userData';

  private tokenExpirationTimer;

  user = new BehaviorSubject<User>(this.getStoredUser());
  userSub = this.user.subscribe((user: User) => {
    this.setStoredUser(user);
    this.setTokenExpirationTimer(user && user.tokenExpiresIn);
  });

  constructor(private http: HttpClient, private router: Router) {}

  setStoredUser(user: User): void {
    if (user) {
      localStorage.setItem(
        AuthService.LOCALSTORAGE_USER_KEY,
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(AuthService.LOCALSTORAGE_USER_KEY);
    }
  }

  getStoredUser(): User {
    const userDataString = localStorage.getItem(
      AuthService.LOCALSTORAGE_USER_KEY
    );
    const userData = JSON.parse(userDataString);
    if (!userDataString || !userData) {
      return null;
    } else {
      return new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
    }
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(environment.auth.signupUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuth(
            response.email,
            response.localId,
            response.idToken,
            parseInt(response.expiresIn)
          );
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(environment.auth.loginUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuth(
            response.email,
            response.localId,
            response.idToken,
            parseInt(response.expiresIn)
          );
        })
      );
  }

  autoLogin() {
    // this.user.next(user);
  }

  autoLogout(expirationDuration: number): void {
    this.setTokenExpirationTimer(expirationDuration);
  }

  setTokenExpirationTimer(expirationDuration: number): void {
    if (expirationDuration != null) {
      this.tokenExpirationTimer = setTimeout(() => {
        alert('Your session has expired. Please login again.');
        this.logout();
      }, expirationDuration);
    } else {
      this.clearTokenExpirationTimer();
    }
  }

  clearTokenExpirationTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/welcome']);
    this.clearTokenExpirationTimer();
  }

  private handleAuth(
    email: string,
    id: string,
    token: string,
    tokenExpiresIn: number
  ): void {
    const user = new User(
      email,
      id,
      token,
      new Date(new Date().getTime() + tokenExpiresIn * 1000)
    );

    this.user.next(user);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error && error.error.error) {
      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'That email already exists.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'The username you entered does not exist.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The username or password you entered is incorrect.';
      }
    }

    return throwError({ ...error, message: errorMessage });
  }
}
