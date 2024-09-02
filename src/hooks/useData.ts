import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

//question mark after requestConfig to make it optional
const useGames = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[] //as we need to use render useEffect everytime selectedgenre is changed,
  // so we need to add dependency on which useEffect should depends/re-render
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return; // to ignore the 1st render by strict mode and only consider 2nd one
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  ); //if dependies array is defined, spread it otherwise consider an empty array

  return { data, error, isLoading };
};

export default useGames;
