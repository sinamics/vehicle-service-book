import type { NextApiRequest, NextApiResponse } from "next";

import { checkSession } from "@/common/checkSession";
import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { carId } = req.query;

  switch (req.method) {
    case "GET":
      const user = await checkSession(req, res);

      const car = await prisma.car.findFirst({
        where: {
          id: String(carId),
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

      if (!car) return res.status(404).json({ message: "No car found" });

      return res.status(200).json(car);
    default:
      return res.status(405).end();
  }
}
