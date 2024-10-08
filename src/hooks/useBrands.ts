import { useQuery } from "@tanstack/react-query";
//import brands from "../data/brands";
import APIClient from "../services/api-client";
import Brand from "../entities/Brand";

const apiClient = new APIClient<Brand>("/brands/lists/parents");

const useBrands = () =>
  useQuery({
    queryKey: ["brands"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, //24hours
    //initialData: brands,
  });
export default useBrands;

///////////////////
