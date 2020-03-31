import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/modules/ingredients/models/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  @ViewChild('f', { static: true }) slForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            unit: this.editedItem.unit,
            isAbsoluteUnit: !this.editedItem.unitIsRelative,
          });
        } else {
          this.slForm.reset();
          this.editedItem = null;
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(
      value.name,
      value.amount,
      value.unit,
      !value.isAbsoluteUnit
    );

    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredients({
          ingredient: newIngredient,
        })
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClickClear() {
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset({
      isAbsoluteUnit: true,
    });
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onClickDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
