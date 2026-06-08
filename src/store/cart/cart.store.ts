import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IProduct } from "../../types/product.type";

type CartState = {
  products: IProduct[];
  totalPrice: number;

};

type CartActions = {
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: number) => void;
  decrementProduct: (id: number) => void;
  incrementProduct: (id: number) => void;
  sendOrder: () => void;
};

export type CartStore = CartState & CartActions;


const calcTotal = (products: IProduct[]) => {
  return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
export const useCartStore = create<CartStore>()(
  persist((set, get) => ({
    products:[],
    totalPrice: 0,
    addToCart: (product) => {
      const products = [
        ...get().products,
        {...product,quantity:1, total:product.price}
      ]
      set({products,totalPrice:calcTotal(products)});
    },
    removeFromCart: (id) => {
      const products = get().products.filter((p) => p.id !== id);
      set({products,totalPrice:calcTotal(products)});
    },
    decrementProduct: (id) => {
      const products = get().products.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              total: (item.quantity - 1) * item.price,
            }
          : item,
      );
      set({products,totalPrice:calcTotal(products)});
    },
    incrementProduct: (id) => {
      const products = get().products.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * item.price,
            }
          : item,
      );
      set({products,totalPrice:calcTotal(products)});
    },
  
    sendOrder: () => {
      set({ products: [], totalPrice: 0 });
      }
  }),
  {
    name: "cart",
    partialize: (state) => ({products: state.products, totalPrice: state.totalPrice}),
  }
));
