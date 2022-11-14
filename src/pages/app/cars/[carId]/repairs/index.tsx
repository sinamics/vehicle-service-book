import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { formatDate, formatPrice } from "@/common/formatters";
import { getServerSideUser } from "@/common/getServerSideUser";
import { sumByField } from "@/common/helpers";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { repairsService } from "@/services/repairsService";

const Repairs = ({ user, repairs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Seo title="Repairs" description="repairs list" />
      <div className="container min-h-app py-6">
        <Breadcrumbs />
        {repairs ? (
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Mileage</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair, index) => (
                  <tr className="break-words" key={repair.id}>
                    <th>{index + 1}</th>
                    <td>{repair.title}</td>
                    <td className="max-w-prose whitespace-normal">{repair.description}</td>
                    <td>{formatDate(repair.date)}</td>
                    <td>{formatPrice(repair.price)}</td>
                    <td>{repair.mileage}</td>
                    <th>
                      <Link
                        href={`/app/car/${repair.carId}/repairs/${repair.id}`}
                        className="btn btn-success btn-sm mr-2">
                        <FiEdit />
                      </Link>
                      <button className="btn btn-error btn-sm">
                        <FiTrash2 />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className="text-right">SUM:</th>
                  <th>{formatPrice(sumByField(repairs, "price"))}</th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <h2 className="text-3xl font-bold text-red-200">No services 🤷‍♂️</h2>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getServerSideUser(context);
  const { getRepairs } = await repairsService(context);
  const repairs = await getRepairs();

  return {
    props: {
      user,
      repairs,
    },
  };
};

export default Repairs;
