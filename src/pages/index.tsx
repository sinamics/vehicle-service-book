import React from "react";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Seo title="Layout" description="Description of Layout" />
      <div className="hero min-h-app bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Car service book</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
