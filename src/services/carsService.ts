import { Car } from "@prisma/client";
import { GetServerSidePropsContext } from "next";

export async function carsService(context: GetServerSidePropsContext) {
  async function getCars(): Promise<Car[] | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cars`, {
      headers: {
        cookie: context.req.headers.cookie || "",
      },
    });

    const data = await res.json();

    if (!res.ok || !data) return null;

    return data;
  }

  async function getCar(carId: string): Promise<Car | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cars/${carId}`, {
      headers: {
        cookie: context.req.headers.cookie || "",
      },
    });

    const data = await res.json();

    if (!res.ok || !data) return null;

    return data;
  }

  async function updateCar(carId: string, values: Partial<Car>): Promise<Car | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cars/${carId}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        cookie: context.req.headers.cookie || "",
      },
    });

    const data = await res.json();

    if (!res.ok || !data) return null;

    return data;
  }

  async function deleteCar(carId: string): Promise<Car | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cars/${carId}`, {
      method: "DELETE",
      headers: {
        cookie: context.req.headers.cookie || "",
      },
    });

    const data = await res.json();

    if (!res.ok || !data) return null;

    return data;
  }

  return {
    getCars,
    getCar,
    updateCar,
    deleteCar,
  };
}
