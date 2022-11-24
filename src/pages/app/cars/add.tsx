import { Button, Container, Input, Radio } from "@nextui-org/react";
import { CarType, EngineType, GearboxType } from "@prisma/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import type { CreateCarSchema } from "@/server/schema/car.schema";
import { trpc } from "@/utils/trpc";

export default function AddCar() {
  const router = useRouter();

  const { mutate } = trpc.car.create.useMutation({
    onSuccess: () => {
      router.push("/app/cars");
    },
  });

  const initialValues: CreateCarSchema = {
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

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      mutate(values);
    },
  });

  return (
    <Layout>
      <Seo title="Add car" description="Add car" />
      <Container>
        <form
          className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-control w-full">
            <Radio.Group
              label="Type"
              defaultValue="Coupe"
              orientation="horizontal"
              onChange={(value) => formik.setFieldValue("type", value)}
            >
              {Object.values(CarType).map((type) => (
                <Radio key={type} value={type}>
                  {type}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <div className="form-control w-full">
            <Input
              id="brand"
              type="text"
              clearable
              bordered
              label="Brand"
              placeholder="Honda"
              {...formik.getFieldProps("brand")}
            />
          </div>
          <div className="form-control w-full">
            <Input
              id="model"
              type="text"
              clearable
              bordered
              label="Model"
              placeholder="Civic"
              {...formik.getFieldProps("model")}
            />
          </div>
          <div className="form-control w-full">
            <Input
              id="generation"
              type="text"
              clearable
              bordered
              label="Generation"
              placeholder="VIII"
              {...formik.getFieldProps("generation")}
            />
          </div>
          <div className="form-control w-full">
            <Input
              id="productionYear"
              type="number"
              min={0}
              bordered
              label="Production Year"
              max={new Date().getFullYear()}
              {...formik.getFieldProps("productionYear")}
            />
          </div>
          <div className="form-control w-full">
            <Radio.Group
              label="Engine Type"
              defaultValue="Diesel"
              orientation="horizontal"
              onChange={(value) => formik.setFieldValue("engineType", value)}
            >
              {Object.values(EngineType).map((type) => (
                <Radio key={type} value={type}>
                  {type}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <div className="form-control w-full">
            <Input
              id="engineCapacity"
              type="number"
              min={0}
              bordered
              label="Engine Capacity"
              {...formik.getFieldProps("engineCapacity")}
            />
          </div>
          <div className="form-control w-full">
            <Input
              id="enginePower"
              type="number"
              min={0}
              bordered
              label="Engine Power"
              {...formik.getFieldProps("enginePower")}
            />
          </div>
          <div className="form-control w-full">
            <Radio.Group
              label="Gearbox Type"
              defaultValue="Automatic"
              orientation="horizontal"
              onChange={(value) => formik.setFieldValue("gearboxType", value)}
            >
              {Object.values(GearboxType).map((type) => (
                <Radio key={type} value={type}>
                  {type}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <Button type="submit">
            {formik.isSubmitting ? "Adding..." : "Add"}
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
