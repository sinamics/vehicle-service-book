import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import Seo from "@/components/Seo";
import AppLayout from "@/layouts/AppLayout";
import { formatDate, formatPrice } from "@/utils/formatters";
import { trpc } from "@/utils/trpc";

export default function Repairs() {
  const { query } = useRouter();
  const utils = trpc.useContext();
  const { data: repairs } = trpc.repair.getAll.useQuery(
    {
      carId: query.carId as string,
    },
    {
      enabled: Boolean(query.carId),
    }
  );

  const { mutate: deleteRepair } = trpc.repair.delete.useMutation({
    onSuccess: () => utils.repair.getAll.invalidate(),
  });

  return (
    <AppLayout>
      <Seo title="Repairs" description="repairs list" />
      <div className="container min-h-app py-6">
        {repairs ? (
          <div className="overflow-x-auto">
            <table className="table-compact table w-full">
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
                    <td className="max-w-prose whitespace-normal">
                      {repair.description}
                    </td>
                    <td>{formatDate(repair.date)}</td>
                    <td>{formatPrice(repair.price)}</td>
                    <td>{repair.mileage}</td>
                    <th>
                      <Link
                        href={`/app/car/${repair.carId}/repairs/${repair.id}`}
                        className="btn btn-success btn-sm mr-2"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() =>
                          deleteRepair({
                            carId: repair.carId,
                            repairId: repair.id,
                          })
                        }
                      >
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
                  <th>sum of prices</th>
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
    </AppLayout>
  );
}
