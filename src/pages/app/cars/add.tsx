import { useFormik } from "formik";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

import { getServerSideUser } from "@/common/getServerSideUser";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const AddCar = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const formik = useFormik({
    initialValues: {
      brand: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log("formik: ", formik);

  return (
    <Layout user={user}>
      <Seo title="Add car" description="Add car" />
      <div className="container py-6 min-h-app">
        <Breadcrumbs />
        <form
          className="flex flex-col justify-center items-center mx-auto gap-2 max-w-sm"
          onSubmit={formik.handleSubmit}>
          <div className="w-full form-control">
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
              className="w-full input input-bordered"
            />
          </div>
          <button className="btn btn-wide" type="submit">
            {formik.isSubmitting ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getServerSideUser(context);

  return {
    props: {
      user,
    },
  };
};

export default AddCar;
