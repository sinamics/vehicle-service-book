import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarType, EngineType, GearboxType } from "@prisma/client";
import cx from "classnames";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import type { CreateCarSchema } from "@/server/schema/car.schema";
import { createCarSchema } from "@/server/schema/car.schema";
import { trpc } from "@/utils/trpc";

export default function AddCar() {
  const router = useRouter();

  const { mutate } = trpc.car.create.useMutation({
    onSuccess: () => {
      router.push("/app/cars");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<CreateCarSchema>({
    resolver: zodResolver(createCarSchema),
  });

  const onSubmit: SubmitHandler<CreateCarSchema> = (values) => {
    mutate(values);
  };

  return (
    <Layout>
      <Seo title="Add car" description="Add car" />
      <div className="container">
        <h2 className="mb-5 text-xl">Add car</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto grid max-w-6xl gap-x-4 gap-y-2 md:grid-cols-2"
        >
          <div className="flex flex-col">
            <label
              className={cx(
                "mb-1 block text-sm font-medium transition-colors",
                {
                  "text-red-400 dark:text-red-500": errors.type?.message,
                  "text-green-400 dark:text-green-500":
                    touchedFields.type && !errors.type?.message,
                }
              )}
              htmlFor="type"
            >
              Type
            </label>
            <select
              id="type"
              defaultValue="Coupe"
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              {...register("type")}
            >
              {Object.values(CarType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="mt-1 min-h-[16px] text-xs text-red-600 dark:text-red-500">
              <Transition
                as="span"
                show={Boolean(errors.type?.message)}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                {errors.type?.message}
              </Transition>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className={cx(
                "mb-1 block text-sm font-medium transition-colors",
                {
                  "text-red-400 dark:text-red-500": errors.brand?.message,
                  "text-green-400 dark:text-green-500":
                    touchedFields.brand && !errors.brand?.message,
                }
              )}
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              id="brand"
              type="text"
              defaultValue=""
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              placeholder="Honda"
              {...register("brand")}
            />
            <div className="mt-1 min-h-[16px] text-xs text-red-600 dark:text-red-500">
              <Transition
                as="span"
                show={Boolean(errors.brand?.message)}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                {errors.brand?.message}
              </Transition>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 block text-sm font-medium" htmlFor="model">
              Model
            </label>
            <input
              id="model"
              type="text"
              defaultValue=""
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              placeholder="Civic"
              {...register("model")}
            />
            <div className="mt-1 min-h-[16px] text-xs text-red-600 dark:text-red-500">
              <Transition
                as="span"
                show={Boolean(errors.model?.message)}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                {errors.model?.message}
              </Transition>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="generation"
            >
              Generation
            </label>
            <input
              id="generation"
              type="text"
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              placeholder="VIII"
              {...register("generation")}
            />
            <div className="mt-1 min-h-[16px] text-xs text-red-600 dark:text-red-500">
              <Transition
                as="span"
                show={Boolean(errors.generation?.message)}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                {errors.generation?.message}
              </Transition>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="productionYear"
            >
              Production Year
            </label>
            <input
              id="productionYear"
              type="number"
              defaultValue={new Date().getFullYear()}
              className="dark:bg-green-100s block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400"
              {...register("productionYear", {
                valueAsNumber: true,
              })}
            />
            <div className="mt-1 min-h-[16px] text-xs text-red-600 dark:text-red-500">
              <Transition
                as="span"
                show={Boolean(errors.productionYear?.message)}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                {errors.productionYear?.message}
              </Transition>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="engineType"
            >
              Engine Type
            </label>
            <select
              id="engineType"
              {...register("engineType")}
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
            >
              {Object.values(EngineType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="mt-1 min-h-[16px] text-xs text-red-600 dark:text-red-500">
              <Transition
                as="span"
                show={Boolean(errors.engineType?.message)}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                {errors.engineType?.message}
              </Transition>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="engineCapacity"
            >
              Engine Capacity
            </label>
            <input
              id="engineCapacity"
              type="number"
              defaultValue={0}
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              {...register("engineCapacity", {
                valueAsNumber: true,
              })}
            />
            <div className="mt-1 min-h-[16px] text-xs text-red-600 dark:text-red-500">
              <Transition
                as="span"
                show={Boolean(errors.engineCapacity?.message)}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                {errors.engineCapacity?.message}
              </Transition>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="enginePower"
            >
              Engine Power
            </label>
            <input
              id="enginePower"
              type="number"
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              defaultValue={0}
              {...register("enginePower", {
                valueAsNumber: true,
              })}
            />
            <div className="mt-1 min-h-[16px] text-xs text-red-600 dark:text-red-500">
              <Transition
                as="span"
                show={Boolean(errors.enginePower?.message)}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                {errors.enginePower?.message}
              </Transition>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="gearboxType"
            >
              Gearbox Type
            </label>
            <select
              id="gearboxType"
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              {...register("gearboxType")}
            >
              {Object.values(GearboxType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="mt-1 min-h-[16px] text-xs text-red-600 dark:text-red-500">
              <Transition
                as="span"
                show={Boolean(errors.gearboxType?.message)}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                {errors.gearboxType?.message}
              </Transition>
            </div>
          </div>

          <button
            className="mx-auto w-full max-w-[200px] rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:col-span-2"
            type="submit"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
