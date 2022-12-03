import "../styles/globals.css";

import { Overpass } from "@next/font/google";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "@/utils/trpc";

const overpass = Overpass({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component className={overpass.className} {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
