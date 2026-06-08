import {create} from "zustand";
import { CategoriesNames } from "../../types/category.type";

export interface CategoriesStore {
  category : CategoriesNames;
  setActiveCategory: (category: CategoriesNames) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  category: CategoriesNames.ALL,
  setActiveCategory: (category) => set({ category }),
}));  