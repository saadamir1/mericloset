import apiClient from "../services/api-client";
import useData, { FetchResponse } from "./useData";
import { useQuery } from "@tanstack/react-query";
import platforms from "../data/platforms";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
const usePlatforms = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Platform>>("/platforms/lists/parents")
        .then((res) => res.data),
    //for 24 hours stored/cached initial data will be used rather than sending request time. will be refreshed after 24hours.
    staleTime: 24 * 60 * 60 * 1000, //24hours
    initialData: { count: platforms.length, results: platforms },
  });
export default usePlatforms;
