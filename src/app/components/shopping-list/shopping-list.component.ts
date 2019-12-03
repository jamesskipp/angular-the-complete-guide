import { Component, OnInit } from '@angular/core';
import { Ingrediant } from 'src/app/models/Ingrediant';

@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

   ingrediants: Ingrediant[] = [
      new Ingrediant('Butter', 1),
      new Ingrediant('Apples', 4)
   ];

   constructor() { }

   ngOnInit() {
   }

   onCatchIngrediantAdded(ingrediant: Ingrediant) {
      this.ingrediants.push(ingrediant);
   }

}
