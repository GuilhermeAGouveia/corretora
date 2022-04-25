import api from "../services/api";
import { Credenciais, Pessoa } from "./interfaces";

const delay = (time: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, time));

export async function sigIn({email, password}: Credenciais) {
  try {
    const response = await api.post<{ token: string; user: any }>("/auth/login", {
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
    return response.data;
  } catch (error) {
    return false;
  }
}
/* 
export async function getUserByToken(token: string) {
  try {
    await api.get("/imovel");
    return {
      name: "João da Silva",
      email: "joao@locao",
    };
  } catch (error) {
    return false;
  }
}

export async function sigIn(email: string, password: string) {
  try {
    await delay();
    return {
      user: {
        name: "João da Silva",
        email,
      },
      token: "token-123",
      error: null,
    };
  } catch (error) {
    return {
      user: "",
      token: "",
      error,
    };
  }
}
 */