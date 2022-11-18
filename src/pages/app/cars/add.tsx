import { useFormik } from "formik";
import React from "react";

import Seo from "@/components/Seo";

const AddCar = () => {
  const formik = useFormik({
    initialValues: {
      brand: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Seo title="Add car" description="Add car" />
      <div className="container min-h-app py-6">
        <form
          className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-control w-full">
            <label className="label" htmlFor="brand">
              <span className="label-text">Brand</span>
            </label>
            <input
              id="brand"
              name="brand"
              onChange={formik.handleChange}
              value={formik.values.brand}
              type="text"
              placeholder="Mercedes"
              className="input input-bordered w-full"
            />
          </div>
          <button className="btn btn-wide" type="submit">
            {formik.isSubmitting ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCar;
