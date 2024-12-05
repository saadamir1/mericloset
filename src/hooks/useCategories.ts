import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Category from "../entities/Category";

const apiClient = new APIClient<Category>("/categories");

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, //24hours
  });

export default useCategories;
