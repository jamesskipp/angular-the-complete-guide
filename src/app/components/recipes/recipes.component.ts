import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
   selector: 'app-recipes',
   templateUrl: './recipes.component.html',
   styleUrls: ['./recipes.component.css'],
   providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

   detailRecipe: Recipe;

   constructor(private recipeService: RecipeService) { }

   ngOnInit() {
      this.recipeService.selectedRecipe.subscribe((recipe: Recipe) => {
         this.detailRecipe = recipe;
      });
   }

}
