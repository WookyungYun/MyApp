import axios from "axios";
import { ApiError } from "src/api/ApiError";

// console.log(process.env.API_SERVER_URL)
export const httpApi = axios.create({
  baseURL: "http://15.164.230.202:3011",
});

httpApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

  return config;
});

httpApi.interceptors.response.use(undefined, (error: any) => {
  throw new ApiError<ApiErrorData>(
    error.response?.data.message || error.message,
    error.response?.data
  );
});

export interface ApiErrorData {
  message: string;
}
