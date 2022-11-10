import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

import { getServerSideUser } from "@/common/getServerSideUser";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const AppIndex = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Seo title="Dashboard" description="car service book dashboard" />
      <div className="container min-h-app py-6">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getServerSideUser(context);
  return {
    props: {
      user,
    },
  };
};

export default AppIndex;
