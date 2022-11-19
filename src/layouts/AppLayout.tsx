import type { PropsWithChildren } from "react";

import Footer from "@/components/Footer";
import type { Link } from "@/components/Header";
import Header from "@/components/Header";

type Props = PropsWithChildren;

const links: Link[] = [
  {
    id: 1,
    href: "/app/cars",
    label: "Cars",
  },
];

const Home = ({ children }: Props) => {
  return (
    <>
      <Header links={links} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
};

export default Home;
