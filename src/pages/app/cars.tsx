import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

import { getUser } from "@/common/getUser";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const Cars = ({ user, cars }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Seo title={"Cars"} description={"cars list"} />
      <Breadcrumbs />
      <h1 className={"text-3xl font-bold"}>Cars</h1>
      <h2 className={"text-3xl font-bold"}>{JSON.stringify(cars, null, 4)}</h2>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getUser(context);

  const res = await fetch("http://localhost:8010/api/cars");
  const { cars } = await res.json();

  return {
    props: {
      user,
      cars,
    },
  };
};

export default Cars;
