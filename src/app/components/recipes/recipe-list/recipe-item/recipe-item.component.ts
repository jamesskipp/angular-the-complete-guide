import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
   selector: 'app-recipe-item',
   templateUrl: './recipe-item.component.html',
   styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

   @Input() recipe: Recipe;

   constructor(private recipeService: RecipeService) { }

   ngOnInit() { }

   onClickRecipe() {
      this.recipeService.selectedRecipe.emit(this.recipe);
   }

}
