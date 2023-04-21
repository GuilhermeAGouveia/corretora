import type { AppProps } from "next/app";
import { AuthProvider } from "../context/Auth";
import GlobalStyle from "../styles/global";
import { ListConfigProvider } from "../context/ListSettings";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <ListConfigProvider>
          <Component {...pageProps} />
        </ListConfigProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
