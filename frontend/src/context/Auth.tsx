import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { getUserByToken, sigIn } from "../lib/auth";
import { getCookie, setCookieWithOptions } from "../lib/cookies";
import { Credenciais, Pessoa } from "../lib/interfaces";

interface AuthValue {
  user: Pessoa | null;
  login(credentials: Credenciais): Promise<void>;
  logout(): void;
  isAuthenticated: boolean;
}

const Auth = createContext({} as AuthValue);

export default Auth;

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<Pessoa | null>(null);

  useEffect(() => {
    const token = getCookie("@corretora:token"); // get token from cookie
    const getUser = async () => {
      const user = await getUserByToken(token);

      if (user) {
        setUser(user);
      } else setUser(null);
    };

    if (token) {
      getUser();
    }
  }, []);

  const login = async (credenciais: Credenciais) => {
    const { token, user, error } = await sigIn(credenciais);
    if (error) throw error;

    setCookieWithOptions("@corretora:token", token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
    setUser(user);
  };

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
