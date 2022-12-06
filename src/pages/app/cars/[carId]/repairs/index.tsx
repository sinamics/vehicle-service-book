import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import { FiAlertCircle, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { formatDate, formatMileage, formatPrice } from "@/utils/formatters";
import { trpc } from "@/utils/trpc";

export default function Repairs() {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  const completeButtonRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    carId: "",
    repairId: "",
  });

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
    <Layout>
      <Seo title="Repairs" description="repairs list" />
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl">Your repairs</h2>
        <Link
          href={`/app/cars/${encodeURIComponent(
            query.carId as string
          )}/repairs/add`}
          className="btn"
        >
          <FiPlus className="mr-2" size={20} />
          Add repair
        </Link>
      </div>
      <div
        ref={animationParent}
        className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {repairs?.length
          ? repairs.map((repair) => (
              <div className="card min-h-[240px] bg-base-200" key={repair.id}>
                <div className="flex h-full flex-col divide-y divide-secondary p-5">
                  <div className="flex flex-grow flex-col gap-1 pb-3">
                    <h4 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                      {repair.title}
                    </h4>
                    <p className="mb-4 flex-grow font-light text-gray-700 dark:text-gray-400">
                      {repair.description}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {formatDate(repair.date)}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span>{" "}
                      {formatPrice(repair.price)}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Mileage:</span>{" "}
                      {formatMileage(repair.mileage)}
                    </p>
                  </div>
                  <div className="flex items-end justify-center gap-2 pt-3">
                    <Link
                      className="btn-outline btn-success btn border-none"
                      aria-label="Edit repair"
                      href={`/app/cars/${repair.carId}/repairs/${repair.id}`}
                    >
                      <FiEdit size={18} />
                    </Link>
                    <button
                      className="btn-outline btn-error btn border-none"
                      aria-label="Delete repair"
                      onClick={() => {
                        setDeleteModal({
                          visible: true,
                          carId: repair.carId,
                          repairId: repair.id,
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
              repairId: "",
            })
          }
        >
          <div className="fixed inset-0 bg-base-100/90" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4 ">
            <Dialog.Panel className="rounded-lg bg-base-200 p-6 text-center shadow">
              <FiAlertCircle className="mx-auto mb-4" size={56} />
              <Dialog.Title className="mb-2 text-xl font-normal text-accent">
                Delete repair?
              </Dialog.Title>
              <Dialog.Description className="mb-5 text-base font-normal">
                This will permanently delete this repair.
              </Dialog.Description>
              <button
                className="btn-ghost btn mr-2"
                onClick={() => {
                  setDeleteModal({
                    visible: false,
                    carId: "",
                    repairId: "",
                  });
                }}
              >
                No, cancel
              </button>
              <button
                ref={completeButtonRef}
                className="btn-error btn"
                onClick={() => {
                  deleteRepair({
                    carId: deleteModal.carId,
                    repairId: deleteModal.repairId,
                  });
                  setDeleteModal({
                    visible: false,
                    carId: "",
                    repairId: "",
                  });
                }}
              >
                Yes I&apos;m sure
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
}
