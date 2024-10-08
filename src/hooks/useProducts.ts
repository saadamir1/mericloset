import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import useProductQueryStore from "../store";
import Product from "../entities/Product";

const apiClient = new APIClient<Product>("/products");

const useProducts = () => {
  const productQuery = useProductQueryStore((s) => s.productQuery);
  return useInfiniteQuery<FetchResponse<Product>, Error>({
    queryKey: ["products", productQuery],
    queryFn: ({ pageParam = 1 }) => {
      return apiClient.getAll({
        params: {
          categoryID: productQuery.categoryID,  // Update the parameter to match your store
          brandID: productQuery.brandID,        // Update to match your store
          ordering: productQuery.sortOrder,
          search: productQuery.searchText,
          page: pageParam,
        },
      }).then((data) => {
        console.log("Fetched Products:", data);  // Log the response
        return data;
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    initialPageParam: 1,
  });
};

export default useProducts;
