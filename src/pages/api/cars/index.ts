import type { NextApiRequest, NextApiResponse } from "next";

import { checkSession } from "@/common/checkSession";
import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const user = await checkSession(req, res);

      const cars = await prisma.car.findMany({
        where: {
          userId: user?.id,
        },
        select: {
          id: true,
          type: true,
          brand: true,
          model: true,
          generation: true,
          productionYear: true,
          engineType: true,
          engineCapacity: true,
          enginePower: true,
          gearboxType: true,
        },
      });

      return res.status(200).json(cars);
    case "POST":
      return res.status(200).json({ message: "Cars created" });
    default:
      return res.status(405).end();
  }
}
