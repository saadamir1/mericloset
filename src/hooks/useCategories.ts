import { useQuery } from "@tanstack/react-query";
//import categories from "../data/categories";
import APIClient from "../services/api-client";
import Category from "../entities/Category";

const apiClient = new APIClient<Category>("/categories");

const useGenres = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, //24hours
    //initialData: categories,
  });

export default useGenres;
