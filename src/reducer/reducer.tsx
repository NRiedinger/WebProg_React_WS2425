import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosURL";

export const loadItems = createAsyncThunk("shop/loadItems", async (test) => {
  const res = await axios.get("/shop/articles", { withCredentials: true });
  return res.data;
});

export interface AppState {
  items: any[];
}

const initialState = {
  items: [],
} as AppState;

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadItems.fulfilled, (state, action) => {
    return {
      ...state,
      items: action.payload,
    };
  });
});
export default reducer;
