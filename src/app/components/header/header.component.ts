import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() navigate: EventEmitter<string> = new EventEmitter();

  isAuthenticated = false;
  user$: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = Boolean(user && user.token);
    });
  }

  onClickNavLink(link) {
    this.navigate.emit(link);
  }

  onClickSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onClickFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onClickLogout() {}
}
