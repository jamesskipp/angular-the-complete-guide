import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, onErrorResumeNext } from 'rxjs';
import { AuthResponseData } from '../models/AuthResponseData';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(environment.authUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((error) => {
          let errorMessage = 'An unknown error occurred!';
          if (error.error && error.error.error) {
            switch (error.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'That email already exists.';
            }
          }

          return throwError({ ...error, message: errorMessage });
        })
      );
  }
}
