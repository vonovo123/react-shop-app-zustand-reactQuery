import { useQuery } from "@tanstack/react-query"
import { getProduct, getProducts } from "../api/products.api"

export const productsQueryKeys = {
  all:["products"] as const,
  list:(category:string) => [...productsQueryKeys.all, "list", category] as const,
  detail:(id:number) => [...productsQueryKeys.all,"detail",id] as const,
}

export const useProductsQuery = (category:string) => useQuery({
  queryKey: productsQueryKeys.list(category),
  queryFn: () => getProducts(category)
})

export const useProductQuery = (id:number) => useQuery({
  queryKey: productsQueryKeys.detail(id),
  queryFn: () => getProduct(id),
  enabled:Number.isFinite(id) && id >0
})