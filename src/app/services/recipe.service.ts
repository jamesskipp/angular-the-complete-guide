import { Recipe } from '../models/Recipe';
import { EventEmitter } from '@angular/core';

export class RecipeService {

   selectedRecipe = new EventEmitter<Recipe>();

   private recipes: Recipe[] = [
      new Recipe(
         'Slow-Roast Gochujang Chicken',
         'This isn’t the crisp-skinned, high-heat-roast chicken you’re probably familiar with. Instead, it’s a melt-in-your-mouth tender, schmaltzy, slow-roast version.',
         'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/16:9/w_1600%2Cc_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg'
      ),
      new Recipe(
         'Perfect Burger',
         `Your new favorite Burger Recipe! There’s nothing like a juicy cheeseburger with fresh crisp toppings on a toasted bun, paired with 
         sweet corn on the cob or potato wedges. We partnered with Beef. It’s What’s for Dinner on behalf of the Beef Checkoff to show you how 
         to make the ultimate juicy burger.`,
         'https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg'
      )
   ];

   getRecipes() {
      return this.recipes.slice();
   }

}