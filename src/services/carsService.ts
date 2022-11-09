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

  async function getCar(carId: number): Promise<Car | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cars/${carId}`, {
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
  };
}
