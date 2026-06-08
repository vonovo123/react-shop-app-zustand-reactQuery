import { fakeStoreClient } from "./client";
import type { IProduct } from "../types/product.type";

export const getProducts = async (category: string): Promise<IProduct[]> => {
  try {
    const url = category ? `/products/category/${category}` : "/products";
    const { data } = await fakeStoreClient.get<IProduct[]>(url);
    return data;
  } catch (error) {
    throw new Error(
      "Error fetching products: " +
        (error instanceof Error ? error.message : "Unknown error"),
    );
  }
};

export const getProduct = async (id: number): Promise<IProduct> => {
  try {
    const { data } = await fakeStoreClient.get<IProduct>(`/products/${id}`);
    return data;
  } catch (error) {
    throw new Error(
      "Error fetching product: " +
        (error instanceof Error ? error.message : "Unknown error"),
    );
  }
};
