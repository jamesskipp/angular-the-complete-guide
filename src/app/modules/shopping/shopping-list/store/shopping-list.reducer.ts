import { Ingredient } from '../../../ingredients/models/ingredient.model';
import { ADD_INGREDIENT, ShoppingListAction } from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 1, 'Whole', true),
    new Ingredient('Tomatoes', 10, 'Whole', true),
  ],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListAction
): object {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    default:
      return state;
  }
}
