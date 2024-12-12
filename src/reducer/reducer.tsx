import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "../axiosURL";
import { ICartItem } from "../interfaces/CartItemInterface";
import { ICategory } from "../interfaces/Category";
import { IProduct } from "../interfaces/ProductInterface";
import { ISubcategory } from "../interfaces/Subcategory";
import { IUser } from "../interfaces/UserInterface";

// Items, Categories, Subcategories
export const loadItemData = createAsyncThunk("shop/loadItemData", async () => {
  const [itemsResponse, categoriesResponse, subcategoriesResponse] =
    await Promise.all([
      axios.get("/shop/articles", { withCredentials: false }),
      axios.get("/shop/categories", { withCredentials: false }),
      axios.get("/shop/subcategories", { withCredentials: false }),
    ]);
  const items = itemsResponse.data;
  const categories = categoriesResponse.data;
  const subcategories = subcategoriesResponse.data;
  return {
    items,
    categories,
    subcategories,
  };
});
export const setItems = createAction<IProduct[]>("shop/setItems");

// User
export const setCurrentUser = createAction<IUser>("shop/setCurrentUser");

// Cart
export const addItemToCart = createAction<ICartItem>("shop/addItemToCart");
export const loadCart = createAction<ICartItem[]>("shop/loadCart");
export const removeItemFromCart = createAction<string>(
  "shop/removeItemFromCart"
);

export interface AppState {
  currentUser: IUser | null;
  items: IProduct[];
  cartItems: ICartItem[];
  categories: ICategory[];
  subcategories: ISubcategory[];
}

const initialState = {
  currentUser: null,
  items: [],
  cartItems: [],
  categories: [],
  subcategories: [],
} as AppState;

const reducer = createReducer(initialState, (builder) => {
  // item list
  builder.addCase(loadItemData.fulfilled, (state, action) => {
    state.items = action.payload.items;
    state.categories = action.payload.categories;
    state.subcategories = action.payload.subcategories;
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
      state.cartItems[foundItemIndex].amount += action.payload.amount;
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
