import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() navigate: EventEmitter<string> = new EventEmitter();

  isAuthenticated = false;
  user$: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = Boolean(user && user.token);
    });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  onClickNavLink(link): void {
    this.navigate.emit(link);
  }

  onClickSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onClickFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onClickLogout(): void {
    this.authService.logout();
  }
}
