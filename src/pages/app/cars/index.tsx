import { Dialog } from "@headlessui/react";
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
        <h2 className="font-mono text-3xl">Your cars</h2>
        <Link href="/app/cars/add" className="btn">
          <FiPlus className="mr-2" size={20} />
          Add car
        </Link>
      </div>
      <div className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars?.length
          ? cars.map((car) => (
              <div className="card min-h-[240px] bg-base-200" key={car.id}>
                <div className="flex h-full flex-col divide-y divide-secondary p-5">
                  <div className="flex flex-grow flex-col gap-1 pb-3">
                    <h4 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
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
                    <p className="mb-2">
                      <span className="font-medium">Gearbox:</span>{" "}
                      {car.gearboxType}
                    </p>
                  </div>
                  <div className="flex items-end justify-center gap-2 pt-3">
                    <Link
                      className="btn-outline btn-info btn border-none"
                      aria-label="Show car repairs"
                      href={`/app/cars/${car.id}/repairs`}
                    >
                      <FiTool size={18} />
                    </Link>
                    <Link
                      className="btn-outline btn-success btn border-none"
                      aria-label="Edit car"
                      href={`/app/cars/${car.id}`}
                    >
                      <FiEdit size={18} />
                    </Link>
                    <button
                      className="btn-outline btn-error btn border-none"
                      aria-label="Delete car"
                      onClick={() => {
                        setDeleteModal({
                          visible: true,
                          carId: car.id,
                        });
                      }}
                    >
                      <FiTrash2 size={18} />
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
        <div className="fixed inset-0 bg-base-100/90" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 ">
          <Dialog.Panel className="rounded-lg bg-base-200 p-6 text-center shadow">
            <FiAlertCircle className="mx-auto mb-4" size={56} />
            <Dialog.Title className="mb-2 text-xl font-normal text-accent">
              Delete car?
            </Dialog.Title>
            <Dialog.Description className="mb-5 text-base font-normal">
              This will permanently delete this car, including all of repairs.
            </Dialog.Description>
            <button
              className="btn-ghost btn mr-2"
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
              className="btn-error btn"
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
