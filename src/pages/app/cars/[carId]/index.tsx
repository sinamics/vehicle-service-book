import { zodResolver } from "@hookform/resolvers/zod";
import { CarType, EngineType, GearboxType } from "@prisma/client";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import type { UpdateCarSchema } from "@/server/schema/car.schema";
import { updateCarSchema } from "@/server/schema/car.schema";
import { queryOnlyOnce } from "@/utils/react-query";
import { trpc } from "@/utils/trpc";

export default function EditCar() {
  const router = useRouter();

  const { isLoading } = trpc.car.getOne.useQuery(
    { carId: router.query.carId as string },
    {
      onSuccess: (data) => {
        setValue("type", data?.type ?? CarType.Coupe);
        setValue("brand", data?.brand ?? "");
        setValue("model", data?.model ?? "");
        setValue(
          "productionYear",
          data?.productionYear ?? new Date().getFullYear()
        );
        setValue("engineType", data?.engineType ?? EngineType.Diesel);
        setValue("engineCapacity", data?.engineCapacity ?? 0);
        setValue("enginePower", data?.enginePower ?? 0);
        setValue("gearboxType", data?.gearboxType ?? GearboxType.Manual);
      },
      enabled: Boolean(router.query.carId),
      ...queryOnlyOnce,
    }
  );

  const { mutate } = trpc.car.update.useMutation({
    onSuccess: () => {
      router.push("/app/cars");
    },
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCarSchema["body"]>({
    resolver: zodResolver(updateCarSchema.shape.body),
  });

  const onSubmit: SubmitHandler<UpdateCarSchema["body"]> = (values) => {
    console.log("values:", values);
    mutate({
      params: { carId: router.query.carId as string },
      body: values,
    });
  };

  return (
    <Layout>
      <Seo title="Edit car" description="Edit car" />
      <div className="container">
        {!isLoading && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto grid max-w-6xl gap-x-4 gap-y-2 md:grid-cols-2 xl:grid-cols-3"
          >
            <div className="flex flex-col">
              <label className="mb-1 block text-sm font-medium" htmlFor="type">
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
              <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
                {errors.type?.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 block text-sm font-medium" htmlFor="brand">
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
              <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
                {errors.brand?.message}
              </p>
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
              <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
                {errors.model?.message}
              </p>
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
              <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
                {errors.generation?.message}
              </p>
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
                className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
                {...register("productionYear", {
                  valueAsNumber: true,
                })}
              />
              <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
                {errors.productionYear?.message}
              </p>
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
                className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
                {...register("engineType")}
              >
                {Object.values(EngineType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
                {errors.engineType?.message}
              </p>
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
              <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
                {errors.engineCapacity?.message}
              </p>
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
              <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
                {errors.enginePower?.message}
              </p>
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
              <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
                {errors.gearboxType?.message}
              </p>
            </div>
            <button
              className="mx-auto mt-2 w-full max-w-[200px] rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:col-span-2 xl:col-span-3"
              type="submit"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
