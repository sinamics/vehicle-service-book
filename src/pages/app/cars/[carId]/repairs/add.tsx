import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import Seo from "@/components/Seo";
import AppLayout from "@/layouts/AppLayout";
import type { CreateRepairSchema } from "@/server/schema/repair.schema";
import { trpc } from "@/utils/trpc";

export default function AddRepair() {
  const router = useRouter();

  const { data: lastMileage } = trpc.repair.getHighestMileage.useQuery(
    {
      carId: router.query.carId as string,
    },
    {
      onSuccess: (data) => {
        formik.setFieldValue("mileage", data.mileage);
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

  const initialValues: CreateRepairSchema["body"] = {
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
        },
        body: values,
      });
    },
  });

  return (
    <AppLayout>
      <Seo title="Add repair" description="Add repair" />
      <div className="container min-h-app py-6">
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              min={lastMileage?.mileage ? lastMileage.mileage : 0}
              className="input input-bordered w-full"
              {...formik.getFieldProps("mileage")}
            />
          </div>
          <button className="btn btn-wide" type="submit">
            {formik.isSubmitting ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
