import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IProduct } from "./products.type";
type ProductType = {
  product: IProduct;
  isLoading: boolean;
  error: string;
};
export const initialState: ProductType = {
  product: {} as IProduct,
  isLoading: false,
  error: "",
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id: number, thunkAPI) => {
    const url = `https://fakestoreapi.com/products/${id}`; // Example URL for fetching a single product
    try {
      const response = await axios.get<IProduct>(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error fetching product: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
    // Implementation for fetching product
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
