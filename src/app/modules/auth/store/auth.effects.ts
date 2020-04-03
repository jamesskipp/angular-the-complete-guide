import { Actions, ofType, Effect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/auth-response-data.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  handleAuth(response: AuthResponseData): AuthActions.AuthenticateSuccess {
    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.expiresIn) * 1000
    );

    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );

    this.authService.setStoredUser(user);
    return new AuthActions.AuthenticateSuccess({
      email: user.email,
      userId: user.id,
      token: user.token,
      expirationDate: user.tokenExpirationDate,
    });
  }

  handleError(error) {
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
  }

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(environment.urls.auth.login, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          map(this.handleAuth.bind(this)),
          catchError(this.handleError.bind(this))
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const user = this.authService.getStoredUser();
      if (user) {
        return new AuthActions.AuthenticateSuccess({
          email: user.email,
          userId: user.id,
          token: user.token,
          expirationDate: user.tokenExpirationDate,
        });
      } else {
        return { type: 'NO_TYPE' };
      }
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
        .post<AuthResponseData>(environment.urls.auth.signUp, {
          email: signUpAction.payload.email,
          password: signUpAction.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          map(this.handleAuth.bind(this)),
          catchError(this.handleError.bind(this))
        );
    })
  );

  @Effect()
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => this.authService.setStoredUser(null))
  );
}
