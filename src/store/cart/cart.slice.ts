import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { IProduct } from "../products/products.type";

const mockApi = "https://6a0519bdaa826ca75c097812.mockapi.io/";
type CartState = {
  products: IProduct[];
  totalPrice: number;
  userId: string;
};

const initialState: CartState = {
  products: localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts") || "")
    : [],
  totalPrice: 0,
  userId: localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId") || "")
    : "",
};

export const postOrder = createAsyncThunk(
  "cart/postOrder",
  async (order: CartState, thunkAPI) => {
    try {
      await axios.post(mockApi + "orders", order);
      thunkAPI.dispatch(sendOrder());
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to post order: " + error);
    }
  },
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      localStorage.setItem("userId", JSON.stringify(state.userId));
    },
    removeUserId: (state) => {
      state.userId = "";
      localStorage.removeItem("userId");
    },
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.products.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    decrementProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity - 1,
              total: (item.quantity - 1) * item.price,
            }
          : item,
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    incrementProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * item.price,
            }
          : item,
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    getTotalPrice: (state) => {
      state.totalPrice = state.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    },
    sendOrder: (state) => {
      state.products = [];
      state.totalPrice = 0;
      localStorage.removeItem("cartProducts");
    },
  },
});
export const {
  setUserId,
  removeUserId,
  addToCart,
  removeFromCart,
  incrementProduct,
  decrementProduct,
  getTotalPrice,
  sendOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
