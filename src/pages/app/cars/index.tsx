import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import { Fragment, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiEdit,
  FiPlus,
  FiTool,
  FiTrash2,
} from "react-icons/fi";

import Loader from "@/components/Loader";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { formatEngineCapacity } from "@/utils/formatters";
import { trpc } from "@/utils/trpc";

function CarsList() {
  const [carsParent] = useAutoAnimate<HTMLDivElement>();

  const completeButtonRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    carId: "",
  });

  const utils = trpc.useContext();
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: cars,
  } = trpc.car.getAll.useQuery();

  const { mutate: deleteCar } = trpc.car.delete.useMutation({
    onSuccess: () => utils.car.getAll.invalidate(),
  });

  if (isLoading) {
    return (
      <Loader>
        <span className="text-gray-400">Loading cars...</span>
      </Loader>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-layout-inside-mobile flex-col items-center justify-center gap-6 sm:min-h-layout-inside">
        {error.message}
      </div>
    );
  }

  if (isSuccess && !cars?.length) {
    return (
      <div className="flex min-h-layout-inside-mobile flex-col items-center justify-center sm:min-h-layout-inside">
        <FiAlertCircle className="mx-auto mb-4" size={56} />
        <h2 className="text-center text-3xl">You don&apos;t have any cars</h2>
        <p className="text-center">
          Add your first car to start tracking your repairs
        </p>
        <Link href="/app/cars/add" className="btn mt-4">
          <FiPlus className="mr-2" size={20} />
          Add car
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl">Your cars</h2>
        <Link href="/app/cars/add" className="btn">
          <FiPlus className="mr-2" size={20} />
          Add car
        </Link>
      </div>
      <div
        ref={carsParent}
        className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {cars?.map((car) => (
          <div className="card min-h-[240px] bg-base-200" key={car.id}>
            <div className="flex h-full flex-col divide-y divide-secondary p-5">
              <div className="flex flex-grow flex-col gap-1 pb-3">
                <h4 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  {car.brand} {car.model} {car.generation} {car.productionYear}
                </h4>
                <p className="mb-4 font-light text-gray-700 dark:text-gray-400">
                  {car.type}
                </p>
                <p>
                  <span className="font-medium">Engine:</span> {car.engineType}{" "}
                  {formatEngineCapacity(car.engineCapacity)} {car.enginePower}
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
        ))}
      </div>
      <Transition
        show={Boolean(deleteModal.visible)}
        as={Fragment}
        enter="transition duration-150 ease"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-300 ease"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
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
      </Transition>
    </>
  );
}

export default function CarsListWrapper({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [containerParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <Layout user={user}>
      <Seo
        title="Cars"
        description="Welcome to the cars list page of our car service book web application! From this page, you can view and manage all of the cars in your service history. The list displays a summary of each car's details like production year, type, engine and gearbox type. From the list page, you can easily access the full service history of any car by clicking on repairs button. Whether you are an individual car owner or managing a fleet of cars, our cars list page provides all the tools you need to stay organized and keep track of your car's repair needs."
      />
      <div ref={containerParent}>
        <CarsList />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  return {
    props: {
      user: session?.user,
    },
  };
}
