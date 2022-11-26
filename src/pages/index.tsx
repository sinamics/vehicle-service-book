import { Button } from "@nextui-org/react";
import NextLink from "next/link";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Seo title="Layout" description="Description of Layout" />
      <h1>Car service book</h1>
      <Button as={NextLink} href="/app">
        Go to app
      </Button>
    </Layout>
  );
}
