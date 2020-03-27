import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        let newRequest = request;
        if (user) {
          newRequest = request.clone({
            params: new HttpParams().set('auth', user.token),
          });
        }
        return next.handle(newRequest);
      })
    );
  }
}
