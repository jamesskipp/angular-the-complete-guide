import { Recipe } from '../models/Recipe';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestAPIConstants } from '../rest-api.constants';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipeService {

   private recipes: Recipe[];
   private URLS = RestAPIConstants.URL_RECIPEBOOK_API;

   constructor(
      private shoppingListService: ShoppingListService,
      private http: HttpClient
   ) { }

   getRecipes(): Recipe[] {
      return this.recipes.slice();
   }

   getRecipe(id: number): Recipe {
      return this.getRecipes()[id];
   }

   addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
   }

   fetchRecipes(): Observable<Recipe[]> {
      return this.http.get<Recipe[]>(this.URLS.BASE + this.URLS.RECIPE);
   }

   fetchRecipe(id: string): Observable<Recipe> {
      return this.http.get<Recipe>(this.URLS.BASE + this.URLS.RECIPE + '/' + id);
   }

}