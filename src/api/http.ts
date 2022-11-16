import axios from "axios";
import { ApiError } from "src/api/ApiError";

console.log(process.env.API_SERVER_URL);
export const httpApi = axios.create({
  baseURL: process.env.API_SERVER_URL,
});

httpApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

  return config;
});

httpApi.interceptors.response.use(undefined, (error: any) => {
  //200이 아닌 401에러가 오면 기존토큰 지우고 로그인페이지로 보내기
  throw new ApiError<ApiErrorData>(
    error.response?.data.message || error.message,
    error.response?.data
  );
});

export interface ApiErrorData {
  message: string;
}
