import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/Auth'
import GlobalStyle from '../styles/global'


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <GlobalStyle />
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
  )
}

export default MyApp
