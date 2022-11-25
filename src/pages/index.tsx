import { Button } from "@nextui-org/react";
import NextLink from "next/link";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Seo title="Layout" description="Description of Layout" />
      <h1 className="text-5xl font-bold">Car service book</h1>
      <Button as={NextLink} href="/app" className="btn-outline btn">
        Go to app
      </Button>
    </Layout>
  );
}
