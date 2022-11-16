import { useFormik } from "formik";
import { InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import React from "react";
import * as Yup from "yup";

import Layout from "@/layouts/Layout";

function getCallbackUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("callbackUrl") || `${window.location.origin}/`;
}

const formInitialValues = {
  email: "",
  password: "",
};

const formValidationSchema = Yup.object({
  email: Yup.string().min(3).max(255).email().required(),
  password: Yup.string().min(3).max(255).required(),
});

export default function Login({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { values, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      const result = await signIn("credentials", {
        redirect: true,
        ...values,
        callbackUrl: getCallbackUrl(),
      });

      if (result?.error) {
        alert(result?.error);
      }
    },
  });

  return (
    <Layout user={null}>
      <div className="container py-6 min-h-app">
        <form className="mx-auto flex max-w-sm flex-col items-stretch justify-center gap-2" onSubmit={handleSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Username</span>
            </label>
            <input
              id="email"
              placeholder="john@doe.com"
              className="input input-bordered"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              placeholder=""
              className="input input-bordered"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
        </form>
        {providers && (
          <div className="mx-auto flex max-w-sm items-center justify-center gap-2">
            {Object.values(providers).map((provider) => (
              <>
                <button key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: getCallbackUrl() })}>
                  Sign in with {provider.name}
                </button>
              </>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
