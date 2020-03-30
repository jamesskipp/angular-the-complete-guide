import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { FormsModule } from '@angular/forms';
import { RecipesRoutingModule } from '../recipes/recipes-routing.module';

@NgModule({
  imports: [IngredientsModule, FormsModule, RecipesRoutingModule],
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  exports: [ShoppingListComponent, ShoppingEditComponent],
  providers: [ShoppingListService],
})
export class ShopppingModule {}
