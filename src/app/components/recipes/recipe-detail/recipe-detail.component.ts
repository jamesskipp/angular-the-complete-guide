import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-recipe-detail',
   templateUrl: './recipe-detail.component.html',
   styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

   @Input() recipe: Recipe;

   constructor(
      private recipeService: RecipeService,
      private route: ActivatedRoute
   ) { }

   ngOnInit() {
      this.route.params.subscribe((params) => {
         this.setRecipe(params.id);
      });
   }

   onClickToShoppingList() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
   }

   setRecipe(id: string) {
      this.recipeService.fetchRecipe(id).subscribe((recipe: Recipe) => {
         this.recipe = recipe;
      });
   }

}
