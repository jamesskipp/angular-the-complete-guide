import { NgModule } from '@angular/core';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './components/recipe-start/recipe-start.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoggingModule } from '../logging/logging.module';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipe-list/recipe-item/recipe-item.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    LoggingModule,
    IngredientsModule,
    RecipesRoutingModule,
  ],
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeStartComponent,
  ],
})
export class RecipesModule {}
