import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/modules/ingredients/models/ingredient.model';
import { ShoppingListService } from 'src/app/modules/shopping/services/shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  private ingredientsChangedSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  onClickEditItem(index: number): void {
    this.shoppingListService.startedEditing.next(index);
  }
}
