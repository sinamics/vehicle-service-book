import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </SessionProvider>
  );
};

export default MyApp;
