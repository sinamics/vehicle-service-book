import { Button, Container, Grid, Input, Textarea } from "@nextui-org/react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";

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
          <form onSubmit={handleSubmit}>
            <Grid.Container css={{ mt: "$10" }} gap={1} justify="center">
              <Grid xs={12} justify="center">
                <Input
                  id="title"
                  type="text"
                  bordered
                  label="Title"
                  css={{ minWidth: "300px" }}
                  placeholder="Replace tires and oil"
                  {...getFieldProps("title")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Textarea
                  id="description"
                  rows={3}
                  bordered
                  label="Description"
                  css={{ minWidth: "300px" }}
                  placeholder="Replaced summer tires to winter and changed oil from 5W30 to 5W40"
                  {...getFieldProps("description")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Input
                  id="price"
                  type="number"
                  min={0}
                  bordered
                  label="Price"
                  css={{ minWidth: "300px" }}
                  {...getFieldProps("price")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Input
                  id="date"
                  type="date"
                  max={dayjs().format("YYYY-MM-DD")}
                  bordered
                  label="Date"
                  css={{ minWidth: "300px" }}
                  {...getFieldProps("date")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Input
                  id="mileage"
                  type="number"
                  min={0}
                  bordered
                  label="Mileage"
                  css={{ minWidth: "300px" }}
                  {...getFieldProps("mileage")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Button css={{ minWidth: "300px" }} type="submit">
                  {isSubmitting ? "Editing..." : "Edit"}
                </Button>
              </Grid>
            </Grid.Container>
          </form>
        )}
      </Container>
    </Layout>
  );
}
