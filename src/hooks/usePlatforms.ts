import { useQuery } from "@tanstack/react-query";
import platforms from "../data/platforms";
import APIClient from "../services/api-client";
import Platform from "../entities/Platform";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    //for 24 hours stored/cached initial data will be used rather than sending request time. will be refreshed after 24hours.
    staleTime: 24 * 60 * 60 * 1000, //24hours
    initialData: platforms,
  });
export default usePlatforms;

///////////////////
