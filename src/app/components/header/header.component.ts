import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   @Output() navigate: EventEmitter<string> = new EventEmitter();

   constructor() { }

   ngOnInit() {
   }

   onClickNavLink(link) {
      this.navigate.emit(link);
   }

}
