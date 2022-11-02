import { useFormik } from "formik";
import { InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import React from "react";
import * as Yup from "yup";

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
    <>
      <form onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className={"form-control w-full max-w-xs"}>
          <label className={"label"} htmlFor={"email"}>
            <span className="label-text">Username</span>
          </label>
          <input
            id={"email"}
            placeholder={"john@doe.com"}
            className={"input input-bordered w-full max-w-xs"}
            name={"email"}
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className={"label"} htmlFor={"password"}>
            <span className="label-text">Password</span>
          </label>
          <input
            id={"password"}
            placeholder={""}
            className={"input input-bordered w-full max-w-xs"}
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </div>
        <button className={"btn"} type="submit">
          Login
        </button>
      </form>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: getCallbackUrl() })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
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
