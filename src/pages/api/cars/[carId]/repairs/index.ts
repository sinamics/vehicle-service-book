import type { NextApiRequest, NextApiResponse } from "next";

import { checkSession } from "@/common/checkSession";
import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await checkSession(req, res);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { carId } = req.query;

  if (req.method === "GET") {
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

    if (!repairs?.length) return res.status(404).json({ message: "No repairs found" });

    return res.status(200).json(repairs);
  }

  if (req.method === "POST") {
    // TODO: Zwaliduj dane z req.body zanim wyślesz do bazy
    const repair = await prisma.repair.create({
      data: {
        carId,
        ...req.body,
      },
    });

    if (!repair) return res.status(404).json({ message: "Repair not added" });

    return res.status(201).json(repair);
  }
}
