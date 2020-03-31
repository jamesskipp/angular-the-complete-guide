import { Actions, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/auth-response-data.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

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
            of();
          }),
          map((response) => {
            of();
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
