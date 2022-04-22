import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { getUserByToken, sigIn } from "../lib/auth";
import { getCookie, setCookieWithOptions } from "../lib/cookies";
import { Credenciais } from "../lib/interfaces";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthValue {
  user: User;
  login(credentials: Credenciais): Promise<void>;
  logout(): void;
  isAuthenticated: boolean;
}

const Auth = createContext({} as AuthValue);

export default Auth;

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const token = getCookie("@corretora:token"); // get token from cookie
    const getUser = async () => await getUserByToken(token);
 
    if (token) {
      const user = getUser();
      setUser(user);
    }
    else setUser(null);
  }, []);

  const login = async ({ email, password }: Credenciais) => {
    const { token, user, error } = await sigIn(email, password);
    if (error) throw error;

    setCookieWithOptions("@corretora:token", token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
    setUser(user);
  }

  const logout = useCallback(() => {
    setUser(null);
    setCookieWithOptions("@corretora:token", "", {
      maxAge: -1,
    });
  }, []);

  const isAuthenticated = !!user;

  return (
    <Auth.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </Auth.Provider>
  );
}

export function useAuth() {
  const context = useContext(Auth);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}