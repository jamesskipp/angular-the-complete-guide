import { Ingredient } from '../models/ingredient';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {

   ingredientsChanged = new EventEmitter<Ingredient[]>();

   private ingredients: Ingredient[] = [
      new Ingredient('Butter', 1),
      new Ingredient('Apples', 4)
   ];

   getIngredients() {
      return this.ingredients.slice();
   }

   addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.emit(this.getIngredients());
   }
}