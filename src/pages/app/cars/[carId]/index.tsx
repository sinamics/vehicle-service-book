import { Button, Container, Grid, Input, Radio } from "@nextui-org/react";
import { CarType, EngineType, GearboxType } from "@prisma/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import type { UpdateCarSchema } from "@/server/schema/car.schema";
import { queryOnlyOnce } from "@/utils/react-query";
import { trpc } from "@/utils/trpc";

export default function EditCar() {
  const router = useRouter();

  const { isLoading } = trpc.car.getOne.useQuery(
    { carId: router.query.carId as string },
    {
      onSuccess: (data) => {
        setValues({
          type: data?.type ?? "Coupe",
          brand: data?.brand,
          model: data?.model,
          generation: data?.generation ?? "",
          productionYear: data?.productionYear ?? new Date().getFullYear(),
          engineType: data?.engineType ?? "Diesel",
          engineCapacity: data?.engineCapacity ?? 0,
          enginePower: data?.enginePower ?? 0,
          gearboxType: data?.gearboxType ?? "Automatic",
        });
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

  const initialValues: UpdateCarSchema["body"] = {
    type: "Coupe",
    brand: "",
    model: "",
    generation: "",
    productionYear: new Date().getFullYear(),
    engineType: "Diesel",
    engineCapacity: 0,
    enginePower: 0,
    gearboxType: "Automatic",
  };

  const {
    isSubmitting,
    setValues,
    setFieldValue,
    handleSubmit,
    values,
    getFieldProps,
  } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      mutate({
        params: { carId: router.query.carId as string },
        body: values,
      });
    },
  });

  return (
    <Layout>
      <Seo title="Edit car" description="Edit car" />
      <Container>
        {!isLoading && (
          <form onSubmit={handleSubmit}>
            <Grid.Container css={{ mt: "$10" }} gap={1} justify="center">
              <Grid xs={12} justify="center">
                <Radio.Group
                  id="type"
                  name="type"
                  label="Type"
                  css={{ minWidth: "300px" }}
                  orientation="vertical"
                  value={values.type}
                  onChange={(value) => setFieldValue("type", value)}
                >
                  {Object.values(CarType).map((type) => (
                    <Radio key={type} value={type}>
                      {type}
                    </Radio>
                  ))}
                </Radio.Group>
              </Grid>
              <Grid xs={12} justify="center">
                <Input
                  id="brand"
                  type="text"
                  bordered
                  label="Brand"
                  css={{ minWidth: "300px" }}
                  placeholder="Honda"
                  {...getFieldProps("brand")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Input
                  id="model"
                  type="text"
                  bordered
                  label="Model"
                  css={{ minWidth: "300px" }}
                  placeholder="Civic"
                  {...getFieldProps("model")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Input
                  id="generation"
                  type="text"
                  bordered
                  label="Generation"
                  css={{ minWidth: "300px" }}
                  placeholder="VIII"
                  {...getFieldProps("generation")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Input
                  id="productionYear"
                  type="number"
                  min={0}
                  max={new Date().getFullYear()}
                  bordered
                  label="Production Year"
                  css={{ minWidth: "300px" }}
                  {...getFieldProps("productionYear")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Radio.Group
                  id="engineType"
                  name="engineType"
                  label="Engine Type"
                  css={{ minWidth: "300px" }}
                  orientation="vertical"
                  value={values.engineType}
                  onChange={(value) => setFieldValue("engineType", value)}
                >
                  {Object.values(EngineType).map((type) => (
                    <Radio key={type} value={type}>
                      {type}
                    </Radio>
                  ))}
                </Radio.Group>
              </Grid>
              <Grid xs={12} justify="center">
                <Input
                  id="engineCapacity"
                  type="number"
                  min={0}
                  bordered
                  label="Engine Capacity"
                  css={{ minWidth: "300px" }}
                  {...getFieldProps("engineCapacity")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Input
                  id="enginePower"
                  type="number"
                  min={0}
                  bordered
                  label="Engine Power"
                  css={{ minWidth: "300px" }}
                  {...getFieldProps("enginePower")}
                />
              </Grid>
              <Grid xs={12} justify="center">
                <Radio.Group
                  id="gearboxType"
                  name="gearboxType"
                  label="Gearbox Type"
                  css={{ minWidth: "300px" }}
                  orientation="vertical"
                  value={values.gearboxType}
                  onChange={(value) => setFieldValue("gearboxType", value)}
                >
                  {Object.values(GearboxType).map((type) => (
                    <Radio key={type} value={type}>
                      {type}
                    </Radio>
                  ))}
                </Radio.Group>
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
