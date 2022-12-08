import type { User } from "@prisma/client";
import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";

import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";

type Props = PropsWithChildren & {
  user?: User;
};

export default function Layout({ user, children }: Props) {
  const { pathname } = useRouter();
  return (
    <>
      {pathname === "/" ? <HomeHeader /> : <AppHeader user={user} />}
      <main className="container min-h-layout-mobile pt-24 pb-8 sm:min-h-layout">
        {children}
      </main>
      <Footer />
    </>
  );
}
