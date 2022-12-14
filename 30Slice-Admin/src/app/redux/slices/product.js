import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../services/admin/product.service";

export const fetchProduct = createAsyncThunk("product/get", async () => {
  const data = await getProducts();
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
  },
  extraReducers: {
    [fetchProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.status = "idle";
      state.products = action.payload;
    },
  },
});

export const productReducer = productSlice.reducer;

export default productSlice;
