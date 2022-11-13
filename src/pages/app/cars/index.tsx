import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";
import { FiEdit, FiTool, FiTrash2 } from "react-icons/fi";

import { getServerSideUser } from "@/common/getServerSideUser";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { carsService } from "@/services/carsService";

const CarsList = ({ user, cars }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Seo title="Cars" description="cars list" />
      <div className="container min-h-app py-6">
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
                    <th>
                      <Link href={`/app/cars/${car.id}/repairs`} className="btn btn-info btn-sm mr-2">
                        <FiTool />
                      </Link>
                      <Link href={`/app/cars/${car.id}`} className="btn btn-success btn-sm mr-2">
                        <FiEdit />
                      </Link>
                      <button className="btn btn-error btn-sm">
                        <FiTrash2 />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="text-3xl font-bold text-red-200">No cars 🤷🏼‍♂️</h2>
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

export default CarsList;
