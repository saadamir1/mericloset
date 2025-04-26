import { useQueries } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Product from "../entities/Product";

const apiClient = new APIClient<Product>("/products");

const useComparedProducts = (productIds: string[]) => {
  const productsQueries = useQueries({
    queries: productIds.map(id => ({
      queryKey: ["products", id],
      queryFn: () => apiClient.get(id),
      staleTime: 5 * 60 * 1000, // 5 minutes
    })),
  });

  const isLoading = productsQueries.some(query => query.isLoading);
  const error = productsQueries.find(query => query.error)?.error;
  const products = productsQueries
    .filter(query => query.data)
    .map(query => query.data as Product);

  return { products, isLoading, error };
};

export default useComparedProducts;