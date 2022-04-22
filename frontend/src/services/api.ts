import axios from "axios";
import { parseCookies } from "nookies";

export const getAPIHTTPClient = (ctx?: any) => {
  const token = parseCookies(ctx);
  console.log("token1:", token);
  const api = axios.create({
    baseURL: `${process.env.BACKEND_PUBLIC_URL || "http://localhost:3333"}`,
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  api.interceptors.request.use((config) => {
    //console.log("config", config.headers);
    return config;
  });

  return api;
};

export default getAPIHTTPClient();
