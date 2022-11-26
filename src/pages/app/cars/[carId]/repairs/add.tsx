import { Button, Container, Grid, Input, Textarea } from "@nextui-org/react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";

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
        setFieldValue("mileage", data.mileage);
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

  const { handleSubmit, getFieldProps, isSubmitting, setFieldValue } =
    useFormik({
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
        <form onSubmit={handleSubmit}>
          <Grid.Container css={{ mt: "$10" }} gap={1} justify="center">
            <Grid xs={12} justify="center">
              <Input
                id="title"
                type="text"
                bordered
                label="Title"
                css={{ minWidth: "300px" }}
                placeholder="Replace the oil filter"
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
                placeholder="We replaced the oil filter with a new one"
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
                bordered
                label="Date"
                css={{ minWidth: "300px" }}
                max={dayjs().format("YYYY-MM-DD")}
                {...getFieldProps("date")}
              />
            </Grid>
            <Grid xs={12} justify="center">
              <Input
                id="mileage"
                type="number"
                bordered
                min={lastMileage?.mileage ? lastMileage.mileage : 0}
                label="Mileage"
                css={{ minWidth: "300px" }}
                {...getFieldProps("mileage")}
              />
            </Grid>
            <Grid xs={12} justify="center">
              <Button css={{ minWidth: "300px" }} type="submit">
                {isSubmitting ? "Adding..." : "Add"}
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </Container>
    </Layout>
  );
}
