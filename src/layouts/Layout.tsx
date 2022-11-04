import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = PropsWithChildren & {
  user?: Partial<User> | null;
};

const homeLinks = [
  {
    id: 1,
    href: "/",
    label: "Item 1",
  },
  {
    id: 2,
    href: "/",
    label: "Item 2",
  },
  {
    id: 3,
    href: "/",
    label: "Item 3",
  },
];

const appLinks = [
  {
    id: 1,
    href: "/",
    label: "Item 1",
  },
  {
    id: 2,
    href: "/",
    label: "Item 2",
  },
];

const Layout = ({ user, children }: Props) => {
  const { pathname } = useRouter();

  return (
    <>
      <Header links={pathname === "/" ? homeLinks : appLinks} user={user} />
      <main className={"pt-16"}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
