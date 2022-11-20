import Link from "next/link";
import React from "react";
import { FiEdit, FiTool, FiTrash2 } from "react-icons/fi";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { formatEngineCapacity } from "@/utils/formatters";
import { trpc } from "@/utils/trpc";

export default function CarsList() {
  const utils = trpc.useContext();
  const { data: cars } = trpc.car.getAll.useQuery();

  const { mutate: deleteCar } = trpc.car.delete.useMutation({
    onSuccess: () => utils.car.getAll.invalidate(),
  });

  return (
    <Layout>
      <Seo title="Cars" description="cars list" />
      <div className="container min-h-app py-6">
        <Link href="/app/cars/add">Add new car</Link>
        {cars?.length ? (
          <div className="overflow-x-auto">
            <table className="table-compact table w-full">
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
                    <td>{formatEngineCapacity(car.engineCapacity)}</td>
                    <td>{car.enginePower} HP</td>
                    <td>{car.gearboxType}</td>
                    <th>
                      <Link
                        href={`/app/cars/${car.id}/repairs`}
                        className="btn-outline btn-info btn-sm btn mr-2"
                      >
                        <FiTool />
                      </Link>
                      <Link
                        href={`/app/cars/${car.id}`}
                        className="btn-outline btn-success btn-sm btn mr-2"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        className="btn-outline btn-error btn-sm btn"
                        onClick={() => deleteCar({ carId: car.id })}
                      >
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
}
