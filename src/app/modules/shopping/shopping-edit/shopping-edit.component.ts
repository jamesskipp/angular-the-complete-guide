import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/modules/shopping/services/shopping-list.service';
import { Ingredient } from 'src/app/modules/ingredients/models/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f', { static: true }) slForm: NgForm;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.editingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(
          this.editedItemIndex
        );
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          unit: this.editedItem.unit,
          isAbsoluteUnit: !this.editedItem.unitIsRelative,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
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
          index: this.editedItemIndex,
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
  }

  onClickDelete() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(this.editedItemIndex)
    );
    this.onClear();
  }
}
