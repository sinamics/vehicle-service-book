import { CarType } from "@prisma/client";
import { useFormik } from "formik";
import React from "react";

import Seo from "@/components/Seo";
import AppLayout from "@/layouts/AppLayout";
import type { CreateCarSchema } from "@/server/schema/car.schema";

export default function AddCar() {
  const initialValues: CreateCarSchema = {
    type: undefined,
    brand: "",
    model: "",
    generation: undefined,
    productionYear: undefined,
    engineType: undefined,
    engineCapacity: undefined,
    enginePower: undefined,
    gearboxType: undefined,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <AppLayout>
      <Seo title="Add car" description="Add car" />
      <div className="container min-h-app py-6">
        <form
          className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-control w-full">
            <label className="label" htmlFor="type">
              <span className="label-text">Type</span>
            </label>
            <select id="type" {...formik.getFieldProps("type")}>
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
              placeholder="Mercedes"
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
              placeholder="CLA45"
              className="input input-bordered w-full"
              {...formik.getFieldProps("model")}
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
