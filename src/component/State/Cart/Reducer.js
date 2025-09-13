import { LOGOUT } from "../Authentication/ActionType";
import * as actionTypes from "./ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const calculateCartTotal = (items) => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIND_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.UPDATE_CARTITEM_REQUEST:
    case actionTypes.REMOVE_CARTITEM_REQUEST:
    case actionTypes.ADD_ITEM_TO_CART_REQUEST:
    case actionTypes.CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FIND_CART_SUCCESS:
    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.cartItems || [],
      };
    
    case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
      const existingItem = state.cartItems.find(
        (item) => item.food.id === action.payload.food.id
      );
      if (existingItem) {
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((item) =>
            item.food.id === action.payload.food.id ? action.payload : item
          ),
        };
      }
      return {
        ...state,
        loading: false,
        cartItems: [...state.cartItems, action.payload],
      };

    // THIS IS THE CORRECTED PART FOR THE TOTAL AMOUNT
    case actionTypes.UPDATE_CARTITEM_SUCCESS:
        const updatedCartItems = state.cartItems.map((item) =>
            item.id === action.payload.id ? action.payload : item
        );
        const newTotal = calculateCartTotal(updatedCartItems);
      return {
        ...state,
        loading: false,
        cartItems: updatedCartItems,
        cart: {
            ...state.cart,
            total: newTotal
        }
      };

    case actionTypes.REMOVE_CARTITEM_SUCCESS:
        const remainingItems = state.cartItems.filter(
            (item) => item.id !== action.payload
        );
        const remainingTotal = calculateCartTotal(remainingItems);
      return {
        ...state,
        loading: false,
        cartItems: remainingItems,
        cart: {
            ...state.cart,
            total: remainingTotal
        }
      };

    case actionTypes.FIND_CART_FAILURE:
    case actionTypes.UPDATE_CARTITEM_FAILURE:
    case actionTypes.REMOVE_CARTITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("jwt");
      return { ...initialState };

    default:
      return state;
  }
};