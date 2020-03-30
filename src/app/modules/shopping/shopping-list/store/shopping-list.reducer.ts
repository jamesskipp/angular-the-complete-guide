import { Ingredient } from '../../../ingredients/models/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 1, 'Whole', true),
    new Ingredient('Tomatoes', 10, 'Whole', true),
  ],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
): object {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: state.ingredients,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient, index) => index !== action.payload
        ),
      };
    default:
      return state;
  }
}
