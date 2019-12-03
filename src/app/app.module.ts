import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { ClickLoggerDirective } from './directives/logging/click-logger.directive';
import { MouseoverLoggerDirective } from './directives/logging/mouseover-logger.directive';

@NgModule({
   declarations: [
      AppComponent,
      ShoppingListComponent,
      RecipeListComponent,
      RecipeItemComponent,
      RecipeDetailComponent,
      HeaderComponent,
      RecipesComponent,
      ShoppingEditComponent,
      DropdownDirective,
      ClickLoggerDirective,
      MouseoverLoggerDirective
   ],
   imports: [
      BrowserModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
