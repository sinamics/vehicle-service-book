import type { PropsWithChildren } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = PropsWithChildren;

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="px-4 pt-16">{children}</main>
      <Footer />
    </>
  );
}
