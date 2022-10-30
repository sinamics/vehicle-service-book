import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";

import { AuthProvider } from "@/context/authContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </AuthProvider>
  );
};

export default MyApp;
