import axios from "axios";
import { getCookie } from "../lib/cookies";

export const getAPIHTTPClient = (ctx?: any) => {
  const token = getCookie("@corretora:token", ctx);

  const api = axios.create({
    baseURL: `${process.env.BACKEND_PUBLIC_URL || "http://localhost:3303"}`,
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
};

export default getAPIHTTPClient();
