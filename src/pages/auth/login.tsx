import { Button, Container, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import type { InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
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
  const { handleSubmit, getFieldProps } = useFormik({
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
      <Container>
        <form onSubmit={handleSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div>
            <Input
              id="email"
              type="email"
              label="Address e-mail"
              placeholder="john@doe.com"
              {...getFieldProps("email")}
            />
          </div>
          <div>
            <Input.Password
              id="password"
              type="password"
              label="Password"
              {...getFieldProps("password")}
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
        {providers && (
          <div>
            {Object.values(providers).map((provider) => {
              if (provider.name === "Credentials") return null;

              return (
                <Button
                  key={provider.name}
                  onClick={() =>
                    signIn(provider.id, { callbackUrl: getCallbackUrl() })
                  }
                >
                  Sign in with {provider.name}
                </Button>
              );
            })}
          </div>
        )}
      </Container>
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
