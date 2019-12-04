import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-recipes',
   templateUrl: './recipes.component.html',
   styleUrls: ['./recipes.component.css'],
   providers: [RecipeService]
})
export class RecipesComponent {

   constructor() { }

}
