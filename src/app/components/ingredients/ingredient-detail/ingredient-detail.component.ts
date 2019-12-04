import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
   selector: 'app-ingredient-detail',
   templateUrl: './ingredient-detail.component.html',
   styleUrls: ['./ingredient-detail.component.css']
})
export class IngredientDetailComponent implements OnInit {

   @Input() ingredient: Ingredient;

   constructor() { }

   ngOnInit() {
   }

}
