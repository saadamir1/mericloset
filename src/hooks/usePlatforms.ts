import { useQuery } from "@tanstack/react-query";
import platforms from "../data/platforms";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    //for 24 hours stored/cached initial data will be used rather than sending request time. will be refreshed after 24hours.
    staleTime: 24 * 60 * 60 * 1000, //24hours
    initialData: { count: platforms.length, next: null, results: platforms },
  });
export default usePlatforms;

///////////////////
