import axios from "axios";
import { getCookie, removeCookies } from "cookies-next";
import Router from "next/router";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOXIDE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(function (config) {
  const token = getCookie("token");
  const api_key = process.env.NEXT_PUBLIC_MONOXIDE_API_KEY;

  return {
    ...config,

    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Api-Key": api_key as string,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeCookies("token");
      removeCookies("user");

      Router.push("/auth/signin");
    }

    console.error("Error at interceptor  :", { ...error });
    // eslint-disable-next-line no-alert
    return Promise.reject(error);
  }
);

export default axiosClient;
