import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
   selector: 'app-shopping-edit',
   templateUrl: './shopping-edit.component.html',
   styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

   constructor(private shoppingListService: ShoppingListService) { }

   ngOnInit() {
   }

   onClickAdd(nameInput, amountInput) {
      this.shoppingListService.addIngredient(new Ingredient(
         nameInput.value, amountInput.value, 'Whole'
      ));
   }

}
