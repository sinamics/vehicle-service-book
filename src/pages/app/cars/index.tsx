import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";

import { getServerSideUser } from "@/common/getServerSideUser";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { carsService } from "@/services/carsService";

const Cars = ({ user, cars }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Seo title="Cars" description="cars list" />
      <div className="container py-6">
        <Breadcrumbs />
        {cars ? (
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Type</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Generation</th>
                  <th>Production Year</th>
                  <th>Engine Type</th>
                  <th>Engine Capacity</th>
                  <th>Engine Power</th>
                  <th>Gearbox Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr key={car.id}>
                    <th>{index + 1}</th>
                    <td>{car.type}</td>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.generation}</td>
                    <td>{car.productionYear}</td>
                    <td>{car.engineType}</td>
                    <td>{car.engineCapacity}</td>
                    <td>{car.enginePower}</td>
                    <td>{car.gearboxType}</td>
                    <th className="flex gap-2">
                      <Link href={`/app/cars/${car.id}/repairs`} className="btn btn-success btn-xs">
                        repairs
                      </Link>
                      <button className="btn btn-error btn-xs">delete</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="text-3xl font-bold text-red-200">Brak samochodów</h2>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getServerSideUser(context);
  const { getCars } = await carsService(context);
  const cars = await getCars();

  return {
    props: {
      user,
      cars,
    },
  };
};

export default Cars;
