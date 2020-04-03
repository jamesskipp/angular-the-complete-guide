import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/modules/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
