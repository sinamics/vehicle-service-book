import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import Footer from "@/components/Footer";
import Header, { Link } from "@/components/Header";

type Props = PropsWithChildren & {
  user?: Partial<User> | null;
};

const Layout = ({ user, children }: Props) => {
  const { pathname } = useRouter();

  return (
    <>
      <Header links={pathname === "/" ? homeLinks : appLinks} user={user} />
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
