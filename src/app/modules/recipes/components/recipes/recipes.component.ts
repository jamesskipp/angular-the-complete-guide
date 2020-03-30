import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/modules/recipes/models/recipe.model';
import { RecipeService } from 'src/app/modules/recipes/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  constructor() {}
}