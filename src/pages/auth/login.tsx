import { zodResolver } from "@hookform/resolvers/zod";
import type { InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import z from "zod";

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

export type LoginFormSchema = z.infer<typeof formValidationSchema>;

export default function Login({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: formInitialValues,
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (values) => {
    console.log("values:", values);
    const result = await signIn("credentials", {
      redirect: true,
      ...values,
      callbackUrl: getCallbackUrl(),
    });

    if (result?.error) {
      alert(result?.error);
    }
  };

  return (
    <>
      <div className="container">
        <form
          className="mx-auto grid max-w-md gap-x-4 gap-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Address e-mail
            </label>
            <input
              id="email"
              type="email"
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              placeholder="john@doe.com"
              {...register("email")}
            />
            <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
              {errors.email?.message}
            </p>
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100"
              id="password"
              type="password"
              {...register("password")}
            />
            <p className="mt-1 min-h-[20px] text-sm text-red-600 dark:text-red-500">
              {errors.password?.message}
            </p>
          </div>
          <button
            className="mx-auto mt-2 w-full max-w-[200px] rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Login
          </button>
        </form>
        {providers && (
          <div>
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
