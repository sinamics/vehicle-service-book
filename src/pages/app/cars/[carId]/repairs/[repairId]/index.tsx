import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import type { UpdateRepairSchema } from "@/server/schema/repair.schema";
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
        formik.setValues({
          title: data?.title,
          description: data?.description ?? "",
          price: data?.price ?? 0,
          date: data?.date
            ? dayjs(data?.date).format("YYYY-MM-DD")
            : dayjs().format("YYYY-MM-DD"),
          mileage: data?.mileage ?? 0,
        });
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

  const initialValues: UpdateRepairSchema["body"] = {
    title: "",
    description: "",
    price: 0,
    date: dayjs().format("YYYY-MM-DD"),
    mileage: 0,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      mutate({
        params: {
          carId: router.query.carId as string,
          repairId: router.query.repairId as string,
        },
        body: values,
      });
    },
  });

  return (
    <Layout>
      <Seo title="Edit repair" description="Edit repair" />
      <div className="container min-h-app py-6">
        {!isLoading && (
          <form
            className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-control w-full">
              <label className="label" htmlFor="title">
                <span className="label-text">Title</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Replace tires and oil"
                className="input-bordered input w-full"
                {...formik.getFieldProps("title")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <input
                id="description"
                type="text"
                placeholder="Replaced summer tires to winter and changed oil from 5W30 to 5W40"
                className="input-bordered input w-full"
                {...formik.getFieldProps("description")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="price">
                <span className="label-text">Price</span>
              </label>
              <input
                id="price"
                type="number"
                min={0}
                className="input-bordered input w-full"
                {...formik.getFieldProps("price")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="date">
                <span className="label-text">Date</span>
              </label>
              <input
                id="date"
                type="date"
                max={dayjs().format("YYYY-MM-DD")}
                className="input-bordered input w-full"
                {...formik.getFieldProps("date")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="mileage">
                <span className="label-text">Mileage</span>
              </label>
              <input
                id="mileage"
                type="number"
                min={0}
                className="input-bordered input w-full"
                {...formik.getFieldProps("mileage")}
              />
            </div>
            <button className="btn-wide btn" type="submit">
              {formik.isSubmitting ? "Editing..." : "Edit"}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
