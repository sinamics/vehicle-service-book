import { Repair } from "@prisma/client";
import { GetServerSidePropsContext } from "next";

export async function repairsService(context: GetServerSidePropsContext) {
  const { carId } = context.query;

  async function getRepairs(): Promise<Repair[] | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cars/${carId}/repairs`, {
      headers: {
        cookie: context.req.headers.cookie || "",
      },
    });

    const data = await res.json();

    if (!res.ok || !data) return null;

    return data;
  }

  async function getRepair(repairId: number): Promise<Repair | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cars/${carId}/repairs/${repairId}`, {
      headers: {
        cookie: context.req.headers.cookie || "",
      },
    });

    const data = await res.json();

    if (!res.ok || !data) return null;

    return data;
  }

  return {
    getRepairs,
    getRepair,
  };
}
