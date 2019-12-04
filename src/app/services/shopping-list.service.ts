import { Ingredient } from '../models/ingredient';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {

   ingredientsChanged = new Subject<Ingredient[]>();

   private ingredients: Ingredient[] = [
      new Ingredient('Butter', 4, 'Tablespoons'),
      new Ingredient('Apples', 2, 'Whole')
   ];

   getIngredients() {
      return this.ingredients.slice();
   }

   addIngredient(ingredient: Ingredient) {
      this.addIngredients([ingredient]);
   }

   addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.next(this.getIngredients());
   }
}