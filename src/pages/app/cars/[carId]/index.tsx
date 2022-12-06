import { zodResolver } from "@hookform/resolvers/zod";
import { CarType, EngineType, GearboxType } from "@prisma/client";
import cx from "classnames";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import type { UpdateCarSchema } from "@/server/schema/car.schema";
import { updateCarSchema } from "@/server/schema/car.schema";
import { queryOnlyOnce } from "@/utils/react-query";
import { trpc } from "@/utils/trpc";

export default function EditCar() {
  const router = useRouter();

  const { isLoading } = trpc.car.getOne.useQuery(
    { carId: router.query.carId as string },
    {
      onSuccess: (data) => {
        setValue("type", data?.type ?? CarType.Coupe);
        setValue("brand", data?.brand ?? "");
        setValue("model", data?.model ?? "");
        setValue("generation", data?.generation ?? "");
        setValue(
          "productionYear",
          data?.productionYear ?? new Date().getFullYear()
        );
        setValue("engineType", data?.engineType ?? EngineType.Diesel);
        setValue("engineCapacity", data?.engineCapacity ?? 0);
        setValue("enginePower", data?.enginePower ?? 0);
        setValue("gearboxType", data?.gearboxType ?? GearboxType.Manual);
      },
      enabled: Boolean(router.query.carId),
      ...queryOnlyOnce,
    }
  );

  const { mutate } = trpc.car.update.useMutation({
    onSuccess: () => {
      router.push("/app/cars");
    },
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCarSchema["body"]>({
    resolver: zodResolver(updateCarSchema.shape.body),
  });

  const onSubmit: SubmitHandler<UpdateCarSchema["body"]> = (values) => {
    console.log("values:", values);
    mutate({
      params: { carId: router.query.carId as string },
      body: values,
    });
  };

  return (
    <Layout>
      <Seo title="Edit car" description="Edit car" />
      {!isLoading && (
        <div className="card w-full bg-secondary dark:bg-primary">
          <div className="card-body flex flex-col gap-0 p-4 sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3"
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
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.type?.message),
                    "input-accent": !Boolean(errors.type?.message),
                  })}
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
                <label className="label" htmlFor="brand">
                  <span
                    className={cx("label-text", {
                      "text-error": Boolean(errors.brand?.message),
                    })}
                  >
                    Brand
                  </span>
                </label>
                <input
                  id="brand"
                  type="text"
                  defaultValue=""
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.brand?.message),
                    "input-accent": !Boolean(errors.brand?.message),
                  })}
                  placeholder="Honda"
                  {...register("brand")}
                />
                <label htmlFor="brand" className="label">
                  <span className="label-text-alt text-error">
                    {errors.brand?.message}
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
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.model?.message),
                    "input-accent": !Boolean(errors.model?.message),
                  })}
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
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.generation?.message),
                    "input-accent": !Boolean(errors.generation?.message),
                  })}
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
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.productionYear?.message),
                    "input-accent": !Boolean(errors.productionYear?.message),
                  })}
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
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.engineType?.message),
                    "input-accent": !Boolean(errors.engineType?.message),
                  })}
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
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.engineCapacity?.message),
                    "input-accent": !Boolean(errors.engineCapacity?.message),
                  })}
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
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.enginePower?.message),
                    "input-accent": !Boolean(errors.enginePower?.message),
                  })}
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
                  className={cx("input-bordered input", {
                    "input-error": Boolean(errors.gearboxType?.message),
                    "input-accent": !Boolean(errors.gearboxType?.message),
                  })}
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
                className="btn-accent btn mx-auto mt-2 w-full max-w-sm sm:col-span-2 lg:col-span-3"
                type="submit"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
