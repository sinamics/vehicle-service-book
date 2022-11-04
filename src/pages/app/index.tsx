import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const AppIndex = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Seo title={"Dashboard"} description={"car service book dashboard"} />
      <Breadcrumbs />
      <h1 className={"text-3xl font-bold"}>Dashboard</h1>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  if (!session) return { props: {} };

  const { user } = session;
  return {
    props: {
      user,
    },
  };
};

export default AppIndex;
