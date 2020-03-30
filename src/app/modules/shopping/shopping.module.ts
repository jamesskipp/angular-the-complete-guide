import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { FormsModule } from '@angular/forms';
import { ShoppingRoutesModule } from './shopping-routes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [IngredientsModule, FormsModule, ShoppingRoutesModule, SharedModule],
  declarations: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShopppingModule {}
