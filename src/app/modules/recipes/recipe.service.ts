import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../ingredients/models/ingredient.model';
import { ShoppingListService } from '../shopping/shopping-list/shopping-list.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestAPIConstants } from '../shared/utils/rest-api.constants';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private URLS = RestAPIConstants.URL_RECIPEBOOK_API;

  private recipes: Recipe[];
  recipesChanged = new Subject<Recipe[]>();

  private selectedRecipe: Recipe;
  selectedRecipeChanged = new Subject<Recipe>();

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient
  ) {}

  load(): void {
    this.fetchRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.recipesChanged.next(this.getRecipes());
    });
  }

  getRecipes(): Recipe[] {
    return this.recipes?.slice();
  }

  setRecipes(recipes: Recipe[]): Recipe[] {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
    return this.getRecipes();
  }

  getSelectedRecipe(): Recipe {
    return this.selectedRecipe;
  }

  setSelectedRecipe(recipe: Recipe): Recipe {
    this.selectedRecipe = recipe;
    this.selectedRecipeChanged.next(this.selectedRecipe);
    return this.selectedRecipe;
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  findRecipe(id: string): Recipe {
    return this.getRecipes().find((recipe) => {
      return recipe.id === id;
    });
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(environment.baseUrl + this.URLS.RECIPE);
  }

  fetchRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(
      environment.baseUrl + this.URLS.RECIPE + '/' + id
    );
  }

  updateRecipe(id: string, newRecipe: Recipe) {
    this.recipes[
      this.recipes.findIndex((recipe) => recipe.id === id)
    ] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  removeRecipe(id: string) {
    this.recipes.splice(
      this.recipes.findIndex((recipe) => recipe.id === id),
      1
    );
    this.recipesChanged.next(this.getRecipes());
  }
}
