import { Actions, ofType, Effect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/auth-response-data.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

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
        .pipe(
          catchError((error) => {
            return of();
          }),
          map((response: AuthResponseData) => {
            const expirationDate = new Date(
              new Date().getTime() + parseInt(response.expiresIn) * 1000
            );

            return of(
              new AuthActions.Login({
                email: response.email,
                userId: response.localId,
                token: response.idToken,
                expirationDate,
              })
            );
          })
        );
      // .pipe(
      //   catchError(this.handleError),
      //   tap((response) => {
      //     this.handleAuth(
      //       response.email,
      //       response.localId,
      //       response.idToken,
      //       parseInt(response.expiresIn)
      //     );
      //   })
      // );
    })
  );
}
