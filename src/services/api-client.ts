import axios, { AxiosRequestConfig } from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export interface FetchResponse<T> {
  [x: string]: any;
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL,
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
}

export default APIClient;
