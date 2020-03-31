import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/modules/ingredients/models/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as ShoppingListActions from '../../shopping/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  private ingredientsChangedSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  onClickEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
