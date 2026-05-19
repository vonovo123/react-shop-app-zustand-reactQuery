import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IOrder } from "./order.type";

type OrderState = {
  orders: IOrder[];
  isLoading: boolean;
  error: string;
};
const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: "",
};

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (userId: string, thunkApi) => {
    try {
      const url = `https://6a0519bdaa826ca75c097812.mockapi.io/orders?search=${userId}`;
      const response = await axios.get<IOrder[]>(url);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Error receiving order :" + error);
    }
  },
);
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
