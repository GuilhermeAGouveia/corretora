const delay = (time: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, time));

/* export async function sigIn(email: string, password: string) {
  try {
    const response = await api.post<{ token: string; user: any }>("/login", {
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

export async function sigUp(name: string, email: string, password: string) {
  try {
    const response = await api.post("/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getUserByToken(token: string) {
  try {
    const response = await api.get("/user/token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return false;
  }
}
 */

export async function getUserByToken(token: string) {
  try {
    await delay();
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
