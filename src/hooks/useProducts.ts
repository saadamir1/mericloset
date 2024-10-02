import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import useProductQueryStore from "../store";
import Product from "../entities/Product";

const apiClient = new APIClient<Product>("/games");

const useProducts = () => {
  const productQuery = useProductQueryStore((s) => s.productQuery);
  return useInfiniteQuery<FetchResponse<Product>, Error>({
    queryKey: ["products", productQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: productQuery.genreID,
          parent_platforms: productQuery.platformID,
          ordering: productQuery.sortOrder,
          search: productQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      // If there's no next page, return undefined to stop fetching
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000, //24hours
    initialPageParam: 1,
  });
};

export default useProducts;
