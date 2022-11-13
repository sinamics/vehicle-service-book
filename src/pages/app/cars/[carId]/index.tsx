import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";
import { FiEdit, FiTool, FiTrash2 } from "react-icons/fi";

import { getServerSideUser } from "@/common/getServerSideUser";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { carsService } from "@/services/carsService";

const Car = ({ user, car }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Seo title="Cars" description="cars list" />
      <div className="container min-h-app py-6">
        <Breadcrumbs />
        {car ? (
          <div>
            <h1>{car.brand}</h1>
          </div>
        ) : (
          <h2 className="text-3xl font-bold text-red-200">No car 🤷🏼‍♂️</h2>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getServerSideUser(context);
  const { getCar } = await carsService(context);
  const car = await getCar(String(context.params?.carId));

  return {
    props: {
      user,
      car,
    },
  };
};

export default Car;
