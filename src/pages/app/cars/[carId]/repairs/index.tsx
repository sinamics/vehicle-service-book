import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { formatDate, formatMileage, formatPrice } from "@/utils/formatters";
import { trpc } from "@/utils/trpc";

export default function Repairs() {
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
      <div className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link
          className="flex min-h-[250px] items-center justify-center rounded-2xl border bg-white shadow-md transition-transform hover:-translate-y-1 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row"
          href={`/app/cars/${encodeURIComponent(
            query.carId as string
          )}/repairs/add`}
        >
          <div className="flex items-center justify-center">
            <FiPlus className="h-12 w-12" size={12} />
          </div>
        </Link>
        {repairs?.length
          ? repairs.map((repair) => (
              <div
                className="min-h-[250px] rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
                key={repair.id}
              >
                <div className="flex h-full flex-col divide-y divide-gray-600 p-5">
                  <div className="flex flex-grow flex-col gap-1 pb-3">
                    <h4 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                      {repair.title}
                    </h4>
                    <p className="mb-4 font-light text-gray-400">
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
                    <p>
                      <span className="font-medium">Mileage:</span>{" "}
                      {formatMileage(repair.mileage)}
                    </p>
                  </div>
                  <div className="flex items-end justify-center gap-2 pt-3">
                    <Link
                      className="rounded-xl p-3 text-green-800 hover:bg-green-900 dark:text-green-600 hover:dark:bg-green-900/40"
                      aria-label="Edit repair"
                      href={`/app/cars/${repair.carId}/repairs/${repair.id}`}
                    >
                      <FiEdit />
                    </Link>
                    <button
                      className="rounded-xl p-3 text-red-800 hover:bg-red-900 dark:text-red-600 hover:dark:bg-red-900/40"
                      aria-label="Delete repair"
                      onClick={() => {
                        setDeleteModal({
                          visible: true,
                          carId: repair.carId,
                          repairId: repair.id,
                        });
                      }}
                    >
                      <FiTrash2 />
                    </button>
                    {/* <Modal
                          aria-labelledby="modal-title"
                          isOpen={Boolean(deleteModal.visible)}
                          onClose={() => {
                            setDeleteModal({
                              visible: false,
                              carId: "",
                            });
                          }}
                        >
                          <ModalHeader>
                            <Text id="modal-title" size="xl">
                              Delete repair?
                            </Text>
                          </ModalHeader>
                          <ModalFooter>
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setDeleteModal({
                                  visible: false,
                                  carId: "",
                                });
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => {
                                deleteCar({ carId: deleteModal.carId });
                                setDeleteModal({
                                  visible: false,
                                  carId: "",
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </ModalFooter>
                        </Modal> */}
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
            repairId: "",
          })
        }
      >
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 ">
          <Dialog.Panel className="rounded-lg bg-white p-6 text-center shadow dark:bg-gray-700">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <Dialog.Title className="mb-2 text-xl font-normal text-gray-500 dark:text-gray-300">
              Delete repair?
            </Dialog.Title>
            <Dialog.Description className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
              This will permanently delete this repair.
            </Dialog.Description>
            <button
              ref={completeButtonRef}
              className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
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
            <button
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
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
          </Dialog.Panel>
        </div>
      </Dialog>
    </Layout>
  );
}
