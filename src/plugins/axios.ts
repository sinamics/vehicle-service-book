import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { Cookies as ReactCookies } from "react-cookie";

const cookies = new ReactCookies();

export const api = axios.create({
  baseURL: "http://localhost:8011/api",
});

const onRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
  const token = cookies.get("access_token");

  if (request && request.headers && token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onError = (error: AxiosError) => {
  if (error?.response?.status === 401) {
    window.location.href = "/";
  }

  return Promise.reject(error);
};

api.interceptors.request.use(onRequest, onError);
api.interceptors.response.use(onResponse, onError);
