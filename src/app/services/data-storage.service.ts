import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/Recipe';
import { RecipeService } from './recipe.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(environment.baseUrl + '/recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
