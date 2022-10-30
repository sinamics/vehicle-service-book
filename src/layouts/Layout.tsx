import { PropsWithChildren } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = PropsWithChildren & {};

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <main className={"pt-16"}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
