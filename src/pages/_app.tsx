import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";

import { Overpass } from "@next/font/google";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        limit={10}
        theme="colored"
      />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
