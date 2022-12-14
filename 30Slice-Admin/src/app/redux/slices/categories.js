import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategory } from "../../services/admin/category.service";

export const fetchCategories = createAsyncThunk("categories/get", async () => {
  const data = await getCategory();
  return data;
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = "idle";
      state.categories = action.payload;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export default categoriesSlice;
