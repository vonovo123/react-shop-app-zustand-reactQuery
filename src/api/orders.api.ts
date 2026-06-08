import { mockApiClient } from "./client";
import type { IOrder } from "../types/order.type";
import type { IProduct } from "../types/product.type";

export type PostOrderPayload = {
  products: IProduct[];
  totalPrice: number;
  userId: string;
};

export const getOrders = async (userId: string): Promise<IOrder[]> => {
  try {
    const { data } = await mockApiClient.get<IOrder[]>("/orders", {
      params: { search: userId },
    });
    return data;
  } catch (error) {
    throw new Error("Error receiving order :" + error);
  }
};

export const postOrder = async (payload: PostOrderPayload): Promise<void> => {
  await mockApiClient.post("/orders", payload);
};
