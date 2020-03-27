import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { AuthResponseData } from '../models/AuthResponseData';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

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
