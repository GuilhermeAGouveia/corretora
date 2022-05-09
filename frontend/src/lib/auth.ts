import api from "../services/api";
import { Credenciais, Pessoa } from "./interfaces";


export async function sigIn({email, password}: Credenciais) {
  try {
    const response = await api.post<{ token: string; user: Pessoa }>("/auth/login", {
      email,
      password,
    });
    return {
      ...response.data,
      error: null,
    };
  } catch (error) {
    return {
      token: "",
      user: null,
      error,
    };
  }
}

export async function sigUp(pessoa: Pessoa) {
  try {
    const response = await api.post("/pessoa", pessoa);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getUserByToken(token: string) {
  try {
    const response = await api.post("/auth/user/token", {
      token,
    });
    return response.data.user;
  } catch (error) {
    return false;
  }
}
