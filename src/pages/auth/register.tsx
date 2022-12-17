import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

import Seo from "@/components/Seo";
import Toast from "@/components/Toast";
import type { AuthSchema } from "@/server/schema/auth.schema";
import { authSchema } from "@/server/schema/auth.schema";
import { trpc } from "@/utils/trpc";

export default function Register() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutate } = trpc.auth.register.useMutation({
    onSuccess: (data) => {
      console.log("data:", data);
      router.push("/auth/login");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit: SubmitHandler<AuthSchema> = async (values) => {
    mutate(values);
  };

  return (
    <>
      <Seo title="Sign in" description="Sign in page." />
      <div className="container flex min-h-screen items-center justify-center">
        <div className="card w-full max-w-sm bg-secondary dark:bg-primary">
          <div className="card-body flex flex-col gap-0 p-4 sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mb-6 flex flex-col gap-2"
            >
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
                    "input-accent": !Boolean(errors.email?.message),
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
              <button
                className={cx("btn-accent btn mt-2", {
                  "btn-disabled loading": isSubmitting,
                })}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Loading" : "Register"}
              </button>
            </form>
          </div>
        </div>
        {success ? (
          <Toast color="success" top right>
            <span className="flex items-center gap-2">
              <FiCheckCircle size={20} />
              Account created successfully!
            </span>
          </Toast>
        ) : null}
        {error ? (
          <Toast color="error" top right>
            <span className="flex items-center gap-2">
              <FiAlertCircle size={20} />
              {error}
            </span>
          </Toast>
        ) : null}
      </div>
    </>
  );
}
