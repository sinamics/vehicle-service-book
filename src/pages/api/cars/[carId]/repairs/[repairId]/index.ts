import type { NextApiRequest, NextApiResponse } from "next";

import { checkSession } from "@/common/checkSession";
import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { carId, repairId } = req.query;

  switch (req.method) {
    case "GET":
      const user = await checkSession(req, res);

      const repair = await prisma.repair.findFirst({
        where: {
          id: String(repairId),
          carId: String(carId),
          AND: {
            car: {
              userId: user?.id,
            },
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          date: true,
          mileage: true,
          car: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!repair) return res.status(404).json({ message: "No repair found" });

      return res.status(200).json(repair);
    default:
      return res.status(405).end();
  }
}
