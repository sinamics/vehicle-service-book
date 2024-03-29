import { zodResolver } from "@hookform/resolvers/zod";
import { CarType, EngineType, GearboxType } from "@prisma/client";
import cx from "classnames";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import type { CreateCarSchema } from "@/server/schema/car.schema";
import { createCarSchema } from "@/server/schema/car.schema";
import { trpc } from "@/utils/trpc";

export default function AddCar({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { mutate } = trpc.car.create.useMutation({
    onSuccess: () => {
      toast.success("Car added successfully!");
      router.push("/app/cars");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCarSchema>({
    resolver: zodResolver(createCarSchema),
  });

  const onSubmit: SubmitHandler<CreateCarSchema> = (values) => {
    mutate(values);
  };

  return (
    <Layout className="container pb-8 pt-24" user={user}>
      <Seo
        title="Add car"
        description="Welcome to the car adding page of our vehicle service book web application! From this page, you can easily add a new car to your service history. Simply enter the make, model, year and type of the car, as well as any other relevant information, such as the engine size, fuel type, gearbox type and VIN. Once you have entered all of the necessary information, simply click the 'add car' button to save the new car to your service history. Our car adding page is designed to be user-friendly and intuitive, making it easy for you to keep track of all of your cars in one place. Whether you are an individual car owner or managing a fleet of cars, our car adding page provides a quick and easy way to add new cars to your service history."
      />
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl">Add car</h2>
      </div>
      <div className="card w-full bg-secondary dark:bg-primary">
        <div className="card-body flex flex-col gap-0 p-4 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            <div className="form-control">
              <label className="label" htmlFor="type">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.type?.message),
                  })}
                >
                  Type
                </span>
              </label>
              <select
                id="type"
                defaultValue="Coupe"
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.type?.message),
                    "input-accent": !Boolean(errors.type?.message),
                  }
                )}
                {...register("type")}
              >
                {Object.values(CarType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label htmlFor="type" className="label">
                <span className="label-text-alt text-error">
                  {errors.type?.message}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="make">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.make?.message),
                  })}
                >
                  Make
                </span>
              </label>
              <input
                id="make"
                type="text"
                defaultValue=""
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.make?.message),
                    "input-accent": !Boolean(errors.make?.message),
                  }
                )}
                placeholder="Honda"
                {...register("make")}
              />
              <label htmlFor="make" className="label">
                <span className="label-text-alt text-error">
                  {errors.make?.message}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="model">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.model?.message),
                  })}
                >
                  Model
                </span>
              </label>
              <input
                id="model"
                type="text"
                defaultValue=""
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.model?.message),
                    "input-accent": !Boolean(errors.model?.message),
                  }
                )}
                placeholder="Civic"
                {...register("model")}
              />
              <label htmlFor="model" className="label">
                <span className="label-text-alt text-error">
                  {errors.model?.message}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="vin">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.vin?.message),
                  })}
                >
                  VIN
                </span>
              </label>
              <input
                id="vin"
                type="text"
                defaultValue=""
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.vin?.message),
                    "input-accent": !Boolean(errors.vin?.message),
                  }
                )}
                {...register("vin")}
              />
              <label htmlFor="vin" className="label">
                <span className="label-text-alt text-error">
                  {errors.vin?.message}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="generation">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.generation?.message),
                  })}
                >
                  Generation
                </span>
              </label>
              <input
                id="generation"
                type="text"
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.generation?.message),
                    "input-accent": !Boolean(errors.generation?.message),
                  }
                )}
                placeholder="VIII"
                {...register("generation")}
              />
              <label htmlFor="generation" className="label">
                <span className="label-text-alt text-error">
                  {errors.generation?.message}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="productionYear">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.productionYear?.message),
                  })}
                >
                  Production Year
                </span>
              </label>
              <input
                id="productionYear"
                type="number"
                defaultValue={new Date().getFullYear()}
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.productionYear?.message),
                    "input-accent": !Boolean(errors.productionYear?.message),
                  }
                )}
                {...register("productionYear", {
                  valueAsNumber: true,
                })}
              />
              <label htmlFor="productionYear" className="label">
                <span className="label-text-alt text-error">
                  {errors.productionYear?.message}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="engineType">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.engineType?.message),
                  })}
                >
                  Engine Type
                </span>
              </label>
              <select
                id="engineType"
                {...register("engineType")}
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.engineType?.message),
                    "input-accent": !Boolean(errors.engineType?.message),
                  }
                )}
              >
                {Object.values(EngineType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label htmlFor="engineType" className="label">
                <span className="label-text-alt text-error">
                  {errors.engineType?.message}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="engineCapacity">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.engineCapacity?.message),
                  })}
                >
                  Engine Capacity
                </span>
              </label>
              <input
                id="engineCapacity"
                type="number"
                defaultValue={0}
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.engineCapacity?.message),
                    "input-accent": !Boolean(errors.engineCapacity?.message),
                  }
                )}
                {...register("engineCapacity", {
                  valueAsNumber: true,
                })}
              />
              <label htmlFor="engineCapacity" className="label">
                <span className="label-text-alt text-error">
                  {errors.engineCapacity?.message}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="enginePower">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.enginePower?.message),
                  })}
                >
                  Engine Power
                </span>
              </label>
              <input
                id="enginePower"
                type="number"
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.enginePower?.message),
                    "input-accent": !Boolean(errors.enginePower?.message),
                  }
                )}
                defaultValue={0}
                {...register("enginePower", {
                  valueAsNumber: true,
                })}
              />
              <label htmlFor="enginePower" className="label">
                <span className="label-text-alt text-error">
                  {errors.enginePower?.message}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="gearboxType">
                <span
                  className={cx("label-text", {
                    "text-error": Boolean(errors.gearboxType?.message),
                  })}
                >
                  Gearbox Type
                </span>
              </label>
              <select
                id="gearboxType"
                className={cx(
                  "input-bordered input shadow-none focus:border-accent",
                  {
                    "input-error": Boolean(errors.gearboxType?.message),
                    "input-accent": !Boolean(errors.gearboxType?.message),
                  }
                )}
                {...register("gearboxType")}
              >
                {Object.values(GearboxType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label htmlFor="gearboxType" className="label">
                <span className="label-text-alt text-error">
                  {errors.gearboxType?.message}
                </span>
              </label>
            </div>
            <button
              className={cx(
                "btn-accent btn mx-auto mt-2 w-full max-w-sm sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5",
                {
                  "btn-disabled loading": isSubmitting,
                }
              )}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Adding car" : "Add car"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  return {
    props: {
      user: session?.user,
    },
  };
}
