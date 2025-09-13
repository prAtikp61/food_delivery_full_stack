import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { restaurantReducer } from "./Restaurant/Reducer";
import { menuItemReducer } from "./Menu/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { restaurantsorderReducer } from "./RestaurantOrder/Reducer";
import { ingredientReducer } from "./ingredients/Reducer";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

// --- Persist Config ---
const persistConfig = {
  key: "root",        // key for localStorage
  storage,            // storage type
  whitelist: ["cart"] // only persist cart (you can add "auth" too if needed)
};

// --- Combine Reducers ---
const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  cart: cartReducer,
  order: orderReducer,
  restaurantorders: restaurantsorderReducer,
  ingredientreducer: ingredientReducer,
});

// --- Apply Persist Reducer ---
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- Create Store ---
export const store = legacy_createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

// --- Persistor (to be used in index.js) ---
export const persistor = persistStore(store);
