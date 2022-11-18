import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const AppIndex = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => {
  return (
    <Layout>
      <Seo title="Dashboard" description="car service book dashboard" />
      <div className="container min-h-app py-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  console.log("session: ", session);
  return {
    props: {},
  };
};

export default AppIndex;
