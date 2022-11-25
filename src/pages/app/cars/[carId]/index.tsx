import { Button, Container, Input, Radio } from "@nextui-org/react";
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
            <div>
              <Radio.Group
                id="type"
                name="type"
                label="Type"
                orientation="horizontal"
                value={values.type}
                onChange={(value) => setFieldValue("type", value)}
              >
                {Object.values(CarType).map((type) => (
                  <Radio key={type} value={type}>
                    {type}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div>
              <Input
                id="brand"
                type="text"
                bordered
                clearable
                label="Brand"
                placeholder="Honda"
                {...getFieldProps("brand")}
              />
            </div>
            <div>
              <Input
                id="model"
                type="text"
                bordered
                clearable
                label="Model"
                placeholder="Civic"
                {...getFieldProps("model")}
              />
            </div>
            <div>
              <Input
                id="generation"
                type="text"
                bordered
                clearable
                label="Generation"
                placeholder="VIII"
                {...getFieldProps("generation")}
              />
            </div>
            <div>
              <Input
                id="productionYear"
                type="number"
                min={0}
                max={new Date().getFullYear()}
                bordered
                label="Production Year"
                {...getFieldProps("productionYear")}
              />
            </div>
            <div>
              <Radio.Group
                id="engineType"
                name="engineType"
                label="Engine Type"
                orientation="horizontal"
                value={values.engineType}
                onChange={(value) => setFieldValue("engineType", value)}
              >
                {Object.values(EngineType).map((type) => (
                  <Radio key={type} value={type}>
                    {type}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div>
              <Input
                id="engineCapacity"
                type="number"
                min={0}
                bordered
                label="Engine Capacity"
                {...getFieldProps("engineCapacity")}
              />
            </div>
            <div>
              <Input
                id="enginePower"
                type="number"
                min={0}
                bordered
                label="Engine Power"
                {...getFieldProps("enginePower")}
              />
            </div>
            <div>
              <Radio.Group
                id="gearboxType"
                name="gearboxType"
                label="Gearbox Type"
                orientation="horizontal"
                value={values.gearboxType}
                onChange={(value) => setFieldValue("gearboxType", value)}
              >
                {Object.values(GearboxType).map((type) => (
                  <Radio key={type} value={type}>
                    {type}
                  </Radio>
                ))}
              </Radio.Group>
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
