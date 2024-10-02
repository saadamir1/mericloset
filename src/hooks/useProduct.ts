import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Product from "../entities/Product";

const apiClient = new APIClient<Product>("/games");

const useProduct = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: () => apiClient.get(slug),
  });

export default useProduct;
