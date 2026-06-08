import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, postOrder, type PostOrderPayload } from "../api/orders.api";
import { useCartStore } from "../store/cart/cart.store";

export const orderQueryKeys = {
  all: ["orders"] as const,
  list: (userId: string) => [...orderQueryKeys.all, "list", userId] as const,
};

export const useOrdersQuery = (userId: string) =>
  useQuery({
    queryKey: orderQueryKeys.list(userId),
    queryFn: () => getOrders(userId),
    enabled: Boolean(userId),
  });

export const usePostOrderMutation = () => {
  const queryClient = useQueryClient();
  const sendOrder = useCartStore((s) => s.sendOrder);

  return useMutation({
    mutationFn: (payload: PostOrderPayload) => postOrder(payload),
    onSuccess: (_data, variables: PostOrderPayload) => {
      sendOrder();
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.list(variables.userId),
      });
    },
    onError: (error: Error) => {
      console.error("Failed to post order:", error);
    },
  });
};