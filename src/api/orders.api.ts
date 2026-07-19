import axios from "axios";
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
    return Array.isArray(data) ? data : [];
  } catch (error) {
    // MockAPI는 검색 결과가 없으면 빈 배열 대신 404를 반환한다.
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw new Error("Error receiving order :" + error);
  }
};

export const postOrder = async (payload: PostOrderPayload): Promise<void> => {
  await mockApiClient.post("/orders", payload);
};
