import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from 'src/environments/environment';
import { RestAPIConstants } from '../rest-api.constants';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        environment.baseUrl + RestAPIConstants.URL_RECIPEBOOK_API.RECIPE
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return { ...recipe, ingredients: recipe.ingredients || [] };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
