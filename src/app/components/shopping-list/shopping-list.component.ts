import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

   ingredients: Ingredient[];

   constructor(private shoppingListService: ShoppingListService) { }

   ngOnInit() {
      this.ingredients = this.shoppingListService.getIngredients();
      this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
         console.log(ingredients);
         this.ingredients = ingredients;
      });
   }

}