import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IProduct } from "./products.type";
type ProductsType = {
  products: IProduct[];
  isLoading: boolean;
  error: string;
};
const initialState: ProductsType = {
  products: [],
  isLoading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category: string, thunkAPI) => {
    let url = "https://fakestoreapi.com/products";
    if (category) {
      url += `/category/${category}`;
    }
    try {
      const response = await axios.get<IProduct[]>(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error fetching products: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  //비동기
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
