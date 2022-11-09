import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

import { getServerSideUser } from "@/common/getServerSideUser";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { carsService } from "@/services/carsService";

const Cars = ({ user, cars }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Seo title={"Cars"} description={"cars list"} />
      <div className="container">
        <Breadcrumbs />
        <h1 className={"text-3xl font-bold"}>Cars</h1>
        {cars ? (
          <h2 className={"text-3xl font-bold"}>
            <pre>
              <code>{JSON.stringify(cars, null, 4)}</code>
            </pre>
          </h2>
        ) : null}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getServerSideUser(context);
  const cars = await carsService(context);
  console.log("cars: ", cars);
  if (cars) {
    return {
      props: {
        user,
        cars,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Cars;
