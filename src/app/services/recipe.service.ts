import { Recipe } from '../models/Recipe';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestAPIConstants } from '../rest-api.constants';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class RecipeService {
  private URLS = RestAPIConstants.URL_RECIPEBOOK_API;

  private recipes: Recipe[];
  recipesChanged = new Subject<Recipe[]>();

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient
  ) {}

  load(): void {
    this.fetchRecipes().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipesChanged.next(this.getRecipes());
      },
      (error) => {
        // this.recipesChanged.error(error);
        // this.recipes = [
        //   new Recipe(
        //     '1',
        //     'Big Fat Burger',
        //     'What else you need to say?',
        //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/5/5/0/FNM_060115-Fatbuger-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1431449537270.jpeg',
        //     []
        //   ),
        // ];
        // this.recipesChanged.next(this.getRecipes());
      }
    );
  }

  getRecipes(): Recipe[] {
    return this.recipes?.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
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
