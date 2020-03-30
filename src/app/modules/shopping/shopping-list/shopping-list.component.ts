import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/modules/ingredients/models/ingredient.model';
import { ShoppingListService } from 'src/app/modules/shopping/services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private ingredientsChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  onClickEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
