import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "../axiosURL";
import { ICartItem } from "../interfaces/CartItemInterface";
import { IProduct } from "../interfaces/ProductInterface";
import { IUser } from "../interfaces/UserInterface";

export const loadItems = createAsyncThunk("shop/loadItems", async () => {
  const res = await axios.get("/shop/articles", { withCredentials: true });
  return res.data;
});
export const setItems = createAction<IProduct[]>("shop/setItems");

export const setCurrentUser = createAction<IUser>("shop/setCurrentUser");

export const addItemToCart = createAction<ICartItem>("shop/addItemToCart");
export const loadCart = createAction<ICartItem[]>("shop/loadCart");
export const removeItemFromCart = createAction<string>(
  "shop/removeItemFromCart"
);

export interface AppState {
  currentUser: IUser | null;
  items: IProduct[];
  cartItems: ICartItem[];
}

const initialState = {
  currentUser: null,
  items: [],
  cartItems: [],
} as AppState;

const reducer = createReducer(initialState, (builder) => {
  // item list
  builder.addCase(loadItems.fulfilled, (state, action) => {
    state.items = action.payload;
  });
  builder.addCase(setItems, (state, action) => {
    state.items = action.payload;
  });

  // user
  builder.addCase(setCurrentUser, (state, action) => {
    state.currentUser = action.payload;
  });

  // cart items
  builder.addCase(addItemToCart, (state, action) => {
    const foundItemIndex = state.cartItems.findIndex((item) => {
      return item.productId === action.payload.productId;
    });

    if (foundItemIndex > -1) {
      state.cartItems[foundItemIndex].amount++;
    } else {
      state.cartItems.push(action.payload);
    }
  });
  builder.addCase(loadCart, (state, action) => {
    state.cartItems = action.payload;
  });
  builder.addCase(removeItemFromCart, (state, action) => {
    state.cartItems = state.cartItems.filter((item) => {
      return item.productId !== action.payload;
    });
  });
});
export default reducer;
