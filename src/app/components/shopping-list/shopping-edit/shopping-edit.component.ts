import { Component, OnInit, EventEmitter, ElementRef, Output } from '@angular/core';
import { Ingrediant } from 'src/app/models/Ingrediant';

@Component({
   selector: 'app-shopping-edit',
   templateUrl: './shopping-edit.component.html',
   styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

   @Output() ingrediantAdded = new EventEmitter<Ingrediant>();

   constructor() { }

   ngOnInit() {
   }

   onClickAdd(nameInput, amountInput) {
      this.ingrediantAdded.emit(new Ingrediant(nameInput.value, amountInput.value));
   }

}
