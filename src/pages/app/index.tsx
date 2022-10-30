import { InferGetServerSidePropsType } from "next";
import React from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const AppIndex = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Seo title={"Dashboard"} description={"car service book dashboard"} />
      <Breadcrumbs />
      <h1 className={"text-3xl font-bold"}>Dashboard</h1>
    </Layout>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default AppIndex;
