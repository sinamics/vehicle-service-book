import type { Car } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { FiEdit, FiTool, FiTrash2 } from "react-icons/fi";

import Seo from "@/components/Seo";
import AppLayout from "@/layouts/AppLayout";
import { formatEngineCapacity } from "@/utils/formatters";

const CarsList = () => {
  const cars: Car[] = [];
  return (
    <AppLayout>
      <Seo title="Cars" description="cars list" />
      <div className="container min-h-app py-6">
        {cars ? (
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
                        className="btn btn-info btn-outline btn-sm mr-2"
                      >
                        <FiTool />
                      </Link>
                      <Link
                        href={`/app/cars/${car.id}`}
                        className="btn btn-success btn-outline btn-sm mr-2"
                      >
                        <FiEdit />
                      </Link>
                      <button className="btn btn-error btn-outline btn-sm">
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
    </AppLayout>
  );
};

export default CarsList;
