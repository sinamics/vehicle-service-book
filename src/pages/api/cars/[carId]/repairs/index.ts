import type { NextApiRequest, NextApiResponse } from "next";

import { checkSession } from "@/common/checkSession";
import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { carId } = req.query;

  switch (req.method) {
    case "GET":
      const user = await checkSession(req, res);

      const repairs = await prisma.repair.findMany({
        where: {
          carId: String(carId),
          AND: {
            car: {
              userId: user?.id,
            },
          },
        },
        orderBy: {
          mileage: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          date: true,
          mileage: true,
          carId: true,
        },
      });

      if (!repairs) return res.status(404).json({ message: "No repairs found" });

      return res.status(200).json(repairs);
    case "POST":
      return res.status(200).json({ message: "Repair created" });
    default:
      return res.status(405).end();
  }
}
