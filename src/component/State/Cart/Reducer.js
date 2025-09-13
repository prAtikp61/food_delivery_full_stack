import { LOGOUT } from "../Authentication/ActionType";
import * as actionTypes from "./ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---- Requests ----
    case actionTypes.FIND_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.UPDATE_CARTITEM_REQUEST:
    case actionTypes.REMOVE_CARTITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // ---- Success ----
    case actionTypes.FIND_CART_SUCCESS:
    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload?.items || [], // safe default
      };

   case actionTypes.ADD_ITEM_TO_CART_SUCCESS: {
  const existingItem = state.cartItems.find(
    (item) => item.id === action.payload.id
  );

  if (existingItem) {
    // update quantity if item already exists
    return {
      ...state,
      loading: false,
      cartItems: state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 } // ✅ increase quantity
          : item
      ),
    };
  } else {
    // add new item if it doesn’t exist
    return {
      ...state,
      loading: false,
      cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
    };
  }
}


 case actionTypes.UPDATE_CARTITEM_SUCCESS:
  return {
    ...state,
    loading: false,
    cartItems: state.cartItems.map((item) =>
      item.id === action.payload.id ? { ...action.payload } : item
    ),
  };



 case actionTypes.REMOVE_CARTITEM_SUCCESS:
  return {
    ...state,
    loading: false,
    cart: action.payload,   // because payload is the full updated cart
    cartItems: action.payload.items, // if backend returns items inside cart
  };



    // ---- Failure ----
    case actionTypes.REMOVE_CARTITEM_FAILURE:
    case actionTypes.UPDATE_CARTITEM_FAILURE:
    case actionTypes.FIND_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ---- Logout ----
    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        cartItems: [],
        cart: null,
        success: "logout success",
      };

    default:
      return state;
  }
};
