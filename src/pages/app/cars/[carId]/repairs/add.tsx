import { Button, Container, Input } from "@nextui-org/react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
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
    <Layout>
      <Seo title="Add repair" description="Add repair" />
      <Container>
        <form
          className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-control w-full">
            <Input
              id="title"
              type="text"
              clearable
              bordered
              label="Title"
              placeholder="Replace tires and oil"
              {...formik.getFieldProps("title")}
            />
          </div>
          <div className="form-control w-full">
            <Input
              id="description"
              type="text"
              clearable
              bordered
              label="Description"
              placeholder="Replaced summer tires to winter and changed oil from 5W30 to 5W40"
              {...formik.getFieldProps("description")}
            />
          </div>
          <div className="form-control w-full">
            <Input
              id="price"
              type="number"
              min={0}
              bordered
              label="Price"
              {...formik.getFieldProps("price")}
            />
          </div>
          <div className="form-control w-full">
            <Input
              id="date"
              type="date"
              bordered
              label="Date"
              max={dayjs().format("YYYY-MM-DD")}
              {...formik.getFieldProps("date")}
            />
          </div>
          <div className="form-control w-full">
            <Input
              id="mileage"
              type="number"
              bordered
              min={lastMileage?.mileage ? lastMileage.mileage : 0}
              label="Mileage"
              {...formik.getFieldProps("mileage")}
            />
          </div>
          <Button type="submit">
            {formik.isSubmitting ? "Adding..." : "Add"}
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
