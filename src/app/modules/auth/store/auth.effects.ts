import { Actions, ofType, Effect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/auth-response-data.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const handleAuth = (
  response: AuthResponseData
): AuthActions.AuthenticateSuccess => {
  const expirationDate = new Date(
    new Date().getTime() + parseInt(response.expiresIn) * 1000
  );

  return new AuthActions.AuthenticateSuccess({
    email: response.email,
    userId: response.localId,
    token: response.idToken,
    expirationDate,
  });
};

const handleError = (error) => {
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

  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(environment.auth.loginUrl, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        })
        .pipe(map(handleAuth), catchError(handleError));
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/recipes']);
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpAction: AuthActions.SignUpStart) => {
      return this.http
        .post<AuthResponseData>(environment.auth.signupUrl, {
          email: signUpAction.payload.email,
          password: signUpAction.payload.password,
          returnSecureToken: true,
        })
        .pipe(map(handleAuth), catchError(handleError));
    })
  );
}
