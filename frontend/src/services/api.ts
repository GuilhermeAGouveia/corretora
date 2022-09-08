import axios from "axios";
import { parseCookies } from "nookies";

export const getAPIHTTPClient = (ctx?: any) => {
  const {'@corretora:token': token} = parseCookies(ctx);
  const api = axios.create({
    baseURL: `${process.env.BACKEND_PUBLIC_URL || "http://localhost:3333"}`,
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
};

export default getAPIHTTPClient();
