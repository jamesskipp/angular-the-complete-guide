import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/modules/shopping/services/shopping-list.service';
import { Ingredient } from 'src/app/modules/ingredients/models/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
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

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngedient = new Ingredient(
      value.name,
      value.amount,
      value.unit,
      !value.isAbsoluteUnit
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngedient
      );
    } else {
      this.shoppingListService.addIngredient(newIngedient);
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
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
