import { CarType, EngineType, GearboxType } from "@prisma/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import Seo from "@/components/Seo";
import AppLayout from "@/layouts/AppLayout";
import type { UpdateCarSchema } from "@/server/schema/car.schema";
import { trpc } from "@/utils/trpc";

export default function EditCar() {
  const router = useRouter();

  const { isLoading } = trpc.car.getOne.useQuery(
    { carId: router.query.carId as string },
    {
      onSuccess: (data) => {
        formik.setValues({
          type: data.type ?? "Coupe",
          brand: data.brand,
          model: data.model,
          generation: data.generation ?? "",
          productionYear: data.productionYear ?? new Date().getFullYear(),
          engineType: data.engineType ?? "Diesel",
          engineCapacity: data.engineCapacity ?? 0,
          enginePower: data.enginePower ?? 0,
          gearboxType: data.gearboxType ?? "Automatic",
        });
      },
      staleTime: Infinity,
      enabled: Boolean(router.query.carId),
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

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      mutate({ params: { carId: router.query.carId as string }, body: values });
    },
  });

  return (
    <AppLayout>
      <Seo title="Edit car" description="Edit car" />
      <div className="container min-h-app py-6">
        {!isLoading && (
          <form
            className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-control w-full">
              <label className="label" htmlFor="type">
                <span className="label-text">Type</span>
              </label>
              <select
                id="type"
                className="input input-bordered w-full"
                {...formik.getFieldProps("type")}
              >
                {Object.values(CarType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="brand">
                <span className="label-text">Brand</span>
              </label>
              <input
                id="brand"
                type="text"
                placeholder="Honda"
                className="input input-bordered w-full"
                {...formik.getFieldProps("brand")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="model">
                <span className="label-text">Model</span>
              </label>
              <input
                id="model"
                type="text"
                placeholder="Civic"
                className="input input-bordered w-full"
                {...formik.getFieldProps("model")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="generation">
                <span className="label-text">Generation</span>
              </label>
              <input
                id="generation"
                type="text"
                placeholder="VIII"
                className="input input-bordered w-full"
                {...formik.getFieldProps("generation")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="productionYear">
                <span className="label-text">Production Year</span>
              </label>
              <input
                id="productionYear"
                type="number"
                min={0}
                max={new Date().getFullYear()}
                placeholder="2009"
                className="input input-bordered w-full"
                {...formik.getFieldProps("productionYear")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="engineType">
                <span className="label-text">Engine Type</span>
              </label>
              <select
                id="type"
                className="input input-bordered w-full"
                {...formik.getFieldProps("engineType")}
              >
                {Object.values(EngineType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="engineCapacity">
                <span className="label-text">Engine Capacity</span>
              </label>
              <input
                id="engineCapacity"
                type="number"
                min={0}
                placeholder="1799"
                className="input input-bordered w-full"
                {...formik.getFieldProps("engineCapacity")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="enginePower">
                <span className="label-text">Engine Power</span>
              </label>
              <input
                id="enginePower"
                type="number"
                min={0}
                placeholder="140"
                className="input input-bordered w-full"
                {...formik.getFieldProps("enginePower")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="gearboxType">
                <span className="label-text">Gearbox Type</span>
              </label>
              <select
                id="type"
                className="input input-bordered w-full"
                {...formik.getFieldProps("gearboxType")}
              >
                {Object.values(GearboxType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-wide" type="submit">
              {formik.isSubmitting ? "Editing..." : "Edit"}
            </button>
          </form>
        )}
      </div>
    </AppLayout>
  );
}
