import { Dialog } from "@headlessui/react";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  FiAlertCircle,
  FiEdit,
  FiPlus,
  FiTool,
  FiTrash2,
} from "react-icons/fi";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { formatEngineCapacity } from "@/utils/formatters";
import { trpc } from "@/utils/trpc";

export default function CarsList() {
  const completeButtonRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    carId: "",
  });

  const utils = trpc.useContext();
  const { data: cars } = trpc.car.getAll.useQuery();

  const { mutate: deleteCar } = trpc.car.delete.useMutation({
    onSuccess: () => utils.car.getAll.invalidate(),
  });

  return (
    <Layout>
      <Seo title="Cars" description="cars list" />
      <div className="mb-4 flex justify-between">
        <h2>Your cars</h2>
        <Button>Add car</Button>
      </div>
      <div className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link
          className="flex min-h-[250px] items-center justify-center rounded-2xl border bg-white shadow-md transition-all hover:-translate-y-1 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900 md:max-w-xl md:flex-row"
          href="/app/cars/add"
        >
          <div className="flex items-center justify-center">
            <FiPlus className="h-12 w-12" size={12} />
          </div>
        </Link>
        {cars?.length
          ? cars.map((car) => (
              <div
                className="min-h-[250px] rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
                key={car.id}
              >
                <div className="flex h-full flex-col divide-y divide-gray-600 p-5">
                  <div className="flex flex-grow flex-col gap-1 pb-3">
                    <h4 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                      {car.brand} {car.model} {car.generation}{" "}
                      {car.productionYear}
                    </h4>
                    <p className="mb-4 font-light text-gray-700 dark:text-gray-400">
                      {car.type}
                    </p>
                    <p>
                      <span className="font-medium">Engine:</span>{" "}
                      {car.engineType}{" "}
                      {formatEngineCapacity(car.engineCapacity)}{" "}
                      {car.enginePower}
                      HP
                    </p>
                    <p>
                      <span className="font-medium">Gearbox:</span>{" "}
                      {car.gearboxType}
                    </p>
                  </div>
                  <div className="flex items-end justify-center gap-2 pt-3">
                    <Link
                      className="rounded-lg p-3 text-lg text-blue-800 hover:bg-blue-200 dark:text-blue-600 hover:dark:bg-blue-900/40"
                      aria-label="Show car repairs"
                      href={`/app/cars/${car.id}/repairs`}
                    >
                      <FiTool />
                    </Link>
                    <Link
                      className="rounded-lg p-3 text-lg text-green-800 hover:bg-green-200 dark:text-green-600 hover:dark:bg-green-900/40"
                      aria-label="Edit car"
                      href={`/app/cars/${car.id}`}
                    >
                      <FiEdit />
                    </Link>
                    <button
                      className="rounded-lg p-3 text-lg text-red-800 hover:bg-red-200 dark:text-red-600 hover:dark:bg-red-900/40"
                      aria-label="Delete car"
                      onClick={() => {
                        setDeleteModal({
                          visible: true,
                          carId: car.id,
                        });
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={Boolean(deleteModal.visible)}
        initialFocus={completeButtonRef}
        className="relative z-50"
        onClose={() =>
          setDeleteModal({
            visible: false,
            carId: "",
          })
        }
      >
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 ">
          <Dialog.Panel className="rounded-lg bg-white p-6 text-center shadow dark:bg-gray-700">
            <FiAlertCircle
              className="mx-auto mb-4 text-gray-400 dark:text-gray-200"
              size={56}
            />
            <Dialog.Title className="mb-2 text-xl font-normal text-gray-500 dark:text-gray-300">
              Delete car?
            </Dialog.Title>
            <Dialog.Description className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
              This will permanently delete this car, including all of repairs.
            </Dialog.Description>
            <button
              className="mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              onClick={() => {
                setDeleteModal({
                  visible: false,
                  carId: "",
                });
              }}
            >
              No, cancel
            </button>
            <button
              ref={completeButtonRef}
              className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
              onClick={() => {
                deleteCar({ carId: deleteModal.carId });
                setDeleteModal({
                  visible: false,
                  carId: "",
                });
              }}
            >
              Yes I&apos;m sure
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Layout>
  );
}
