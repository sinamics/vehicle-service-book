import React from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const Car = () => {
  return (
    <Layout>
      <Seo title={"Car"} description={"cars list"} />
      <Breadcrumbs />
      <h1 className={"text-3xl font-bold"}>Car</h1>
    </Layout>
  );
};

export default Car;
