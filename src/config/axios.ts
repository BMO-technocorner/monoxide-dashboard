import axios from "axios";
import { getCookie } from "cookies-next";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOXIDE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.defaults.withCredentials = false;

axiosClient.interceptors.request.use(function (config) {
  const token = getCookie("token");
  const api_key = process.env.NEXT_PUBLIC_MONOXIDE_API_KEY;

  if (config.headers) {
    config.headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      "Api-Key": api_key as string,
    };
  }

  return config;
});

export default axiosClient;
