import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

   recipes: Recipe[];
   recipe$: Subscription;

   constructor(private recipeService: RecipeService) { }

   ngOnInit() {
      this.recipe$ = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
         this.recipes = recipes;
      });
      this.recipeService.load();
   }

   ngOnDestroy() {
      this.recipe$.unsubscribe();
   }

}
