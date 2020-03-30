import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/modules/ingredients/models/ingredient.model';

@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.css'],
})
export class IngredientDetailComponent implements OnInit {
  @Input() ingredient: Ingredient;

  constructor() {}

  ngOnInit() {}
}
