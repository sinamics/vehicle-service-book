import { Button, Container, Input } from "@nextui-org/react";
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
        setValues({
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

  const { isSubmitting, handleSubmit, getFieldProps, setValues } = useFormik({
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
      <Container>
        {!isLoading && (
          <form
            className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2"
            onSubmit={handleSubmit}
          >
            <div>
              <Input
                id="title"
                type="text"
                bordered
                clearable
                label="Title"
                placeholder="Replace tires and oil"
                {...getFieldProps("title")}
              />
            </div>
            <div>
              <Input
                id="description"
                type="text"
                bordered
                clearable
                label="Description"
                placeholder="Replaced summer tires to winter and changed oil from 5W30 to 5W40"
                {...getFieldProps("description")}
              />
            </div>
            <div>
              <Input
                id="price"
                type="number"
                min={0}
                bordered
                label="Price"
                {...getFieldProps("price")}
              />
            </div>
            <div>
              <Input
                id="date"
                type="date"
                max={dayjs().format("YYYY-MM-DD")}
                bordered
                label="Date"
                {...getFieldProps("date")}
              />
            </div>
            <div>
              <Input
                id="mileage"
                type="number"
                min={0}
                bordered
                label="Mileage"
                {...getFieldProps("mileage")}
              />
            </div>
            <Button type="submit">
              {isSubmitting ? "Editing..." : "Edit"}
            </Button>
          </form>
        )}
      </Container>
    </Layout>
  );
}
