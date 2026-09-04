import axios, { AxiosRequestConfig } from "axios";
import { API_BASE } from "../config";

export interface FetchResponse<T> {
  [x: string]: any;
  count: number;
  next: string | null;
  results: T[];
}

function attachAuth(config: any) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

axiosInstance.interceptors.request.use(attachAuth);
axios.interceptors.request.use(attachAuth);

const onUnauthorized = (error: any) => {
  if (error?.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (!window.location.pathname.includes("/login")) {
      window.location.assign("/login");
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use((res) => res, onUnauthorized);
axios.interceptors.response.use((res) => res, onUnauthorized);

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
    return axiosInstance.get<T>(this.endpoint + "/" + id).then((res) => res.data);
  };
}

export { axiosInstance };
export default APIClient;
