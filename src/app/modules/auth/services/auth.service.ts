import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { AuthResponseData } from '../models/auth-response-data.model';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/modules/auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly LOCALSTORAGE_USER_KEY = 'userData';

  private tokenExpirationTimer;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

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
      const user = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      return user && user.token ? user : null;
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
    const user = this.getStoredUser();
    if (user) {
      this.store.dispatch(
        new AuthActions.Login({
          email: user.email,
          userId: user.id,
          token: user.token,
          expirationDate: user.tokenExpirationDate,
        })
      );
    }
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
    this.store.dispatch(new AuthActions.Logout());
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

    this.store.dispatch(
      new AuthActions.Login({
        email: user.email,
        userId: user.id,
        token: user.token,
        expirationDate: user.tokenExpirationDate,
      })
    );
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
