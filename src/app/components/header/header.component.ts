import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() navigate: EventEmitter<string> = new EventEmitter();

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {}

  onClickNavLink(link) {
    this.navigate.emit(link);
  }

  onClickSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onClickFetchData() {
    this.dataStorageService.fetchRecipes();
  }
}
