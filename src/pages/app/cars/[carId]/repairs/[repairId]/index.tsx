import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import type { UpdateRepairSchema } from "@/server/schema/repair.schema";
import { updateRepairSchema } from "@/server/schema/repair.schema";
import { queryOnlyOnce } from "@/utils/react-query";
import { trpc } from "@/utils/trpc";

export default function EditRepair() {
  const router = useRouter();

  const { isLoading } = trpc.repair.getOne.useQuery(
    {
      carId: router.query.carId as string,
      repairId: router.query.repairId as string,
    },
    {
      onSuccess: (data) => {
        setValue("title", data?.title ?? "");
        setValue("description", data?.description ?? "");
        setValue("price", data?.price ?? 0);
        setValue(
          "date",
          dayjs(data?.date).format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD")
        );
        setValue("mileage", data?.mileage ?? 0);
      },
      enabled: Boolean(router.query.carId) && Boolean(router.query.repairId),
      ...queryOnlyOnce,
    }
  );

  const { mutate } = trpc.repair.update.useMutation({
    onSuccess: () => {
      router.push({
        pathname: "/app/cars/[carId]/repairs",
        query: { carId: router.query.carId },
      });
    },
  });

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateRepairSchema["body"]>({
    resolver: zodResolver(updateRepairSchema.shape.body),
  });

  const onSubmit: SubmitHandler<UpdateRepairSchema["body"]> = (values) => {
    mutate({
      params: {
        carId: router.query.carId as string,
        repairId: router.query.repairId as string,
      },
      body: values,
    });
  };

  return (
    <Layout>
      <Seo title="Edit repair" description="Edit repair" />
      {!isLoading ? (
        <div className="card w-full bg-secondary dark:bg-primary">
          <div className="card-body flex flex-col gap-0 p-4 sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="form-control sm:col-span-2 lg:col-span-3">
                <label className="label" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.title?.message),
                    "input-accent": !Boolean(errors.title?.message),
                  })}
                  {...register("title")}
                />
                <label htmlFor="title" className="label">
                  <span className="label-text-alt text-error">
                    {errors.title?.message}
                  </span>
                </label>
              </div>
              <div className="form-control sm:col-span-2 lg:col-span-3">
                <label className="label" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  className={cx("textarea-bordered textarea", {
                    "textarea-error": Boolean(errors.description?.message),
                    "textarea-accent": !Boolean(errors.description?.message),
                  })}
                  {...register("description")}
                />
                <label htmlFor="description" className="label">
                  <span className="label-text-alt text-error">
                    {errors.description?.message}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="price">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  defaultValue={0}
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.price?.message),
                    "input-accent": !Boolean(errors.price?.message),
                  })}
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />
                <label htmlFor="price" className="label">
                  <span className="label-text-alt text-error">
                    {errors.price?.message}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  defaultValue={dayjs().format("YYYY-MM-DD")}
                  max={dayjs().format("YYYY-MM-DD")}
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.date?.message),
                    "input-accent": !Boolean(errors.date?.message),
                  })}
                  {...register("date")}
                />
                <label htmlFor="date" className="label">
                  <span className="label-text-alt text-error">
                    {errors.date?.message}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="mileage">
                  Mileage
                </label>
                <input
                  id="mileage"
                  type="number"
                  defaultValue={0}
                  min={getValues("mileage") ?? 0}
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.mileage?.message),
                    "input-accent": !Boolean(errors.mileage?.message),
                  })}
                  {...register("mileage", {
                    valueAsNumber: true,
                  })}
                />
                <label htmlFor="mileage" className="label">
                  <span className="label-text-alt text-error">
                    {errors.mileage?.message}
                  </span>
                </label>
              </div>
              <button
                className={cx(
                  "btn-accent btn mx-auto mt-2 w-full max-w-sm sm:col-span-2 lg:col-span-3",
                  {
                    "btn-disabled loading": isSubmitting,
                  }
                )}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Updating" : "Update"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
