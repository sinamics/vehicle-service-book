import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import type { InferGetServerSidePropsType } from "next";
import type { ClientSafeProvider } from "next-auth/react";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { DiGithubBadge } from "react-icons/di";
import { SiFacebook, SiGoogle, SiTwitter } from "react-icons/si";

import type { AuthSchema } from "@/server/schema/auth.schema";
import { authSchema } from "@/server/schema/auth.schema";

function getCallbackUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("callbackUrl") || `${window.location.origin}/`;
}

function providerIcon(providerName: ClientSafeProvider["name"]) {
  switch (providerName) {
    case "Google":
      return <SiGoogle className="mr-2 -ml-1 h-6 w-6" />;
    case "Facebook":
      return <SiFacebook className="mr-2 -ml-1 h-6 w-6" />;
    case "Twitter":
      return <SiTwitter className="mr-2 -ml-1 h-6 w-6" />;
    case "GitHub":
      return <DiGithubBadge className="mr-2 -ml-1 h-6 w-6" />;
    default:
      return undefined;
  }
}

function providerButton(provider: ClientSafeProvider) {
  return (
    <button
      className="btn"
      key={provider.name}
      onClick={() => signIn(provider.id, { callbackUrl: getCallbackUrl() })}
    >
      {providerIcon(provider.name)}
      Sign in with {provider.name}
    </button>
  );
}

export default function Login({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit: SubmitHandler<AuthSchema> = async (values) => {
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
      <div className="container flex min-h-screen items-center justify-center">
        <div className="card w-full max-w-sm bg-secondary dark:bg-primary">
          <div className="card-body flex flex-col gap-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span
                    className={cx("label-text", {
                      "text-error": Boolean(errors.email?.message),
                    })}
                  >
                    Your email
                  </span>
                </label>
                <input
                  id="email"
                  type="text"
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.email?.message),
                    "input-accent": !Boolean(errors.password?.message),
                  })}
                  placeholder="example@gmail.com"
                  {...register("email")}
                />
                <label htmlFor="email" className="label">
                  <span className="label-text-alt text-error">
                    {errors.email?.message}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span
                    className={cx("label-text", {
                      "text-error": Boolean(errors.password?.message),
                    })}
                  >
                    Your password
                  </span>
                </label>
                <input
                  id="password"
                  type="password"
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.password?.message),
                    "input-accent": !Boolean(errors.password?.message),
                  })}
                  {...register("password")}
                />
                <label htmlFor="password" className="label">
                  <span className="label-text-alt text-error">
                    {errors.password?.message}
                  </span>
                </label>
              </div>
              <button className="btn-accent btn mt-2" type="submit">
                {isSubmitting ? "Loading..." : "Login"}
              </button>
            </form>
            <div className="divider"></div>
            {providers && (
              <div className="flex flex-col gap-2">
                {Object.values(providers).map((provider) => {
                  if (provider.name === "Credentials") return null;
                  return providerButton(provider);
                })}
              </div>
            )}
          </div>
        </div>
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
