import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "../axiosURL";
import { IProduct } from "../interfaces/ProductInterface";
import { IUser } from "../interfaces/UserInterface";

export const loadItems = createAsyncThunk("shop/loadItems", async () => {
  const res = await axios.get("/shop/articles", { withCredentials: true });
  return res.data;
});

export const setCurrentUser = createAction<IUser>("shop/setCurrentUser");

export interface AppState {
  currentUser: IUser | null;
  items: IProduct[];
}

const initialState = {
  currentUser: null,
  items: [],
} as AppState;

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadItems.fulfilled, (state, action) => {
    state.items = action.payload;
  });

  builder.addCase(setCurrentUser, (state, action) => {
    state.currentUser = action.payload;
  });
});
export default reducer;
