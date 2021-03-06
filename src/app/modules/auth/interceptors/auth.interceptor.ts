import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
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
