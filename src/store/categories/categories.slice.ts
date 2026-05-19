import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CategoriesNames } from "./categories.type";
const initialState: string = CategoriesNames.ALL;
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setActiveCategory: (_, action: PayloadAction<CategoriesNames>) =>
      action.payload,
  },
});

export const { setActiveCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
