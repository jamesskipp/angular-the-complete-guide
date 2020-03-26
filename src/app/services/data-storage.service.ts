import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/Recipe';
import { RecipeService } from './recipe.service';
import { environment } from 'src/environments/environment';
import { RestAPIConstants } from '../rest-api.constants';
import { map } from 'rxjs/operators';
import { RecipesComponent } from '../components/recipes/recipes.component';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(
        environment.baseUrl + RestAPIConstants.URL_RECIPEBOOK_API.RECIPE,
        recipes
      )
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }

  fetchRecipes(): void {
    this.http
      .get<Recipe[]>(
        environment.baseUrl + RestAPIConstants.URL_RECIPEBOOK_API.RECIPE
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return { ...recipe, ingredients: recipe.ingredients || [] };
          });
        })
      )
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
