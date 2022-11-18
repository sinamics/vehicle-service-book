import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";

import Footer from "@/components/Footer";
import type { Link } from "@/components/Header";
import Header from "@/components/Header";

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  const { pathname } = useRouter();

  return (
    <>
      <Header links={pathname === "/" ? homeLinks : appLinks} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
};

const homeLinks: Link[] = [];

const appLinks: Link[] = [
  {
    id: 1,
    href: "/app/cars",
    label: "Cars",
  },
];

export default Layout;
