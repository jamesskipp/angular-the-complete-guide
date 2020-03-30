import { Ingredient } from '../../../ingredients/models/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 1, 'Whole', true),
    new Ingredient('Tomatoes', 10, 'Whole', true),
  ],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
): object {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    default:
      return state;
  }
}
