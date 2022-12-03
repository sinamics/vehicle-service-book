import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import type { CreateRepairSchema } from "@/server/schema/repair.schema";
import { createRepairSchema } from "@/server/schema/repair.schema";
import { trpc } from "@/utils/trpc";

export default function AddRepair() {
  const router = useRouter();

  const { data: lastMileage } = trpc.repair.getHighestMileage.useQuery(
    {
      carId: router.query.carId as string,
    },
    {
      onSuccess: (data) => {
        setValue("mileage", data.mileage ?? 0);
      },
      enabled: Boolean(router.query.carId),
    }
  );

  const { mutate } = trpc.repair.create.useMutation({
    onSuccess: () => {
      router.push({
        pathname: "/app/cars/[carId]/repairs",
        query: { carId: router.query.carId },
      });
    },
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<CreateRepairSchema["body"]>({
    resolver: zodResolver(createRepairSchema.shape.body),
  });

  const onSubmit: SubmitHandler<CreateRepairSchema["body"]> = (values) => {
    mutate({
      params: {
        carId: router.query.carId as string,
      },
      body: values,
    });
  };

  return (
    <Layout>
      <Seo title="Add repair" description="Add repair" />
      <div className="container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto grid max-w-md gap-x-4 gap-y-2"
        >
          <div className="flex flex-col">
            <label
              className={cx(
                "mb-1 block text-sm font-medium transition-colors",
                {
                  "text-red-400 dark:text-red-500": errors.title?.message,
                  "text-green-400 dark:text-green-500":
                    touchedFields.title && !errors.title?.message,
                }
              )}
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              {...register("title")}
            />
            <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
              {errors.title?.message}
            </p>
          </div>
          <div className="flex flex-col">
            <label
              className={cx(
                "mb-1 block text-sm font-medium transition-colors",
                {
                  "text-red-400 dark:text-red-500": errors.description?.message,
                  "text-green-400 dark:text-green-500":
                    touchedFields.description && !errors.description?.message,
                }
              )}
              htmlFor="Title"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              {...register("description")}
            />
            <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
              {errors.description?.message}
            </p>
          </div>
          <div className="flex flex-col">
            <label
              className={cx(
                "mb-1 block text-sm font-medium transition-colors",
                {
                  "text-red-400 dark:text-red-500": errors.price?.message,
                  "text-green-400 dark:text-green-500":
                    touchedFields.price && !errors.price?.message,
                }
              )}
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              defaultValue={0}
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              {...register("price", {
                valueAsNumber: true,
              })}
            />
            <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
              {errors.price?.message}
            </p>
          </div>
          <div className="flex flex-col">
            <label
              className={cx(
                "mb-1 block text-sm font-medium transition-colors",
                {
                  "text-red-400 dark:text-red-500": errors.date?.message,
                  "text-green-400 dark:text-green-500":
                    touchedFields.date && !errors.date?.message,
                }
              )}
              htmlFor="date"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              defaultValue={dayjs().format("YYYY-MM-DD")}
              min={dayjs().format("YYYY-MM-DD")}
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              {...register("date")}
            />
            <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
              {errors.date?.message}
            </p>
          </div>
          <div className="flex flex-col">
            <label
              className={cx(
                "mb-1 block text-sm font-medium transition-colors",
                {
                  "text-red-400 dark:text-red-500": errors.mileage?.message,
                  "text-green-400 dark:text-green-500":
                    touchedFields.mileage && !errors.mileage?.message,
                }
              )}
              htmlFor="mileage"
            >
              Mileage
            </label>
            <input
              id="mileage"
              type="number"
              defaultValue={0}
              min={lastMileage?.mileage ?? 0}
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              {...register("mileage", {
                valueAsNumber: true,
              })}
            />
            <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
              {errors.mileage?.message}
            </p>
          </div>
          <button
            className="mx-auto mt-2 w-full max-w-[200px] rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
