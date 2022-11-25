import { Overpass } from "@next/font/google";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

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
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <SessionProvider session={session}>
          <Component className={overpass.className} {...pageProps} />
        </SessionProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

export default trpc.withTRPC(MyApp);
