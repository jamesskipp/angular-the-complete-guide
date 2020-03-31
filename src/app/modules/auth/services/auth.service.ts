import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  autoLogin(): void {
    const user = this.getStoredUser();
    if (user) {
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
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
}
