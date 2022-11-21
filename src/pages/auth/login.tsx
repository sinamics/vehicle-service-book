import { useFormik } from "formik";
import type { InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import React from "react";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

function getCallbackUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("callbackUrl") || `${window.location.origin}/`;
}

const formInitialValues = {
  email: "",
  password: "",
};

const formValidationSchema = z.object({
  email: z.string().min(3).max(255).email(),
  password: z.string().min(3).max(255),
});

export default function Login({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { values, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: formInitialValues,
    validationSchema: toFormikValidationSchema(formValidationSchema),
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
    <>
      <div className="container min-h-app py-6">
        <form
          className="mx-auto flex max-w-sm flex-col items-stretch justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Username</span>
            </label>
            <input
              id="email"
              placeholder="john@doe.com"
              className="input-bordered input"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <label htmlFor="email" className="label">
              <span className="label-text-alt">Label for errors</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              placeholder=""
              className="input-bordered input"
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
            {Object.values(providers).map((provider) => {
              if (provider.name === "Credentials") return null;

              return (
                <button
                  key={provider.name}
                  onClick={() =>
                    signIn(provider.id, { callbackUrl: getCallbackUrl() })
                  }
                >
                  Sign in with {provider.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
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
