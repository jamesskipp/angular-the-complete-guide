import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/models/ingredient';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-shopping-edit',
   templateUrl: './shopping-edit.component.html',
   styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

   editingSubscription: Subscription;
   editMode = false;
   editedItemIndex: number;
   editedItem: Ingredient;

   @ViewChild('f', { static: true }) slForm: NgForm;

   constructor(private shoppingListService: ShoppingListService) { }

   ngOnInit() {
      this.editingSubscription = this.shoppingListService.startedEditing
         .subscribe((index: number) => {
            this.editedItemIndex = index;
            this.editMode = false;
            this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
            this.slForm.setValue({
               name: this.editedItem.name,
               amount: this.editedItem.amount,
               unit: this.editedItem.unit
            })
         });
   }

   ngOnDestroy() {
      this.editingSubscription.unsubscribe();
   }

   onClickAdd(form: NgForm) {
      const value = form.value;
      const newIngedient = new Ingredient(value.name, value.amount, value.unit);
   }

}
