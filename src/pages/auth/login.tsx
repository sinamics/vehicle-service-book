import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Label, TextInput } from "flowbite-react";
import type { InferGetServerSidePropsType } from "next";
import type { ClientSafeProvider } from "next-auth/react";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { DiGithubBadge } from "react-icons/di";
import { SiFacebook, SiGoogle, SiTwitter } from "react-icons/si";

import ErrorMessage from "@/components/ErrorMessage";
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
      return "/images/flowbite.svg";
  }
}

function providerButton(provider: ClientSafeProvider) {
  return (
    <Button
      key={provider.name}
      color="gray"
      size="xs"
      onClick={() => signIn(provider.id, { callbackUrl: getCallbackUrl() })}
    >
      {providerIcon(provider.name)}
      Sign in with {provider.name}
    </Button>
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
        <Card className="w-full max-w-sm">
          <div className="flex flex-col gap-4 divide-y divide-gray-600">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  type="text"
                  placeholder="example@gmail.com"
                  color={errors.email?.message ? "failure" : undefined}
                  {...register("email")}
                />
                <ErrorMessage error={errors.email?.message} />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  color={errors.password?.message ? "failure" : undefined}
                  {...register("password")}
                />
                <ErrorMessage error={errors.password?.message} />
              </div>
              <Button className="mt-2" type="submit">
                {isSubmitting ? "Loading..." : "Login"}
              </Button>
            </form>
            {providers && (
              <div className="flex flex-col gap-2 pt-4">
                {Object.values(providers).map((provider) => {
                  if (provider.name === "Credentials") return null;
                  return providerButton(provider);
                })}
              </div>
            )}
          </div>
        </Card>
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
