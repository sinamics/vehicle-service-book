import { Container } from "@nextui-org/react";
import type { PropsWithChildren } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = PropsWithChildren;

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Container fluid css={{ minHeight: "calc(100vh - 152px)" }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
