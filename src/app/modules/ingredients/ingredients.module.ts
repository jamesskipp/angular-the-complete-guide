import { NgModule } from '@angular/core';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';

@NgModule({
  declarations: [IngredientDetailComponent],
  exports: [IngredientDetailComponent],
})
export class IngredientsModule {}
