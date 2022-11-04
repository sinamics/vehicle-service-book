import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const Car = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={props.user}>
      <Seo title={"Car"} description={"cars list"} />
      <Breadcrumbs />
      <h1 className={"text-3xl font-bold"}>
        <pre>
          <code>{JSON.stringify(props, null, 4)}</code>
        </pre>
      </h1>
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

export default Car;
