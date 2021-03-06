import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from '../../../services/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from '../services/recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Recipe[] {
    return (
      this.recipeService.getRecipes() || this.dataStorageService.fetchRecipes()
    );
  }
}
