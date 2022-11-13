import type { NextApiRequest, NextApiResponse } from "next";

import { checkSession } from "@/common/checkSession";
import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await checkSession(req, res);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "GET") {
    const cars = await prisma.car.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
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

    if (!cars?.length) return res.status(404).json({ message: "No cars found" });

    return res.status(200).json(cars);
  }

  if (req.method === "POST") {
    // TODO: Zwaliduj dane z req.body zanim wyślesz do bazy
    const car = await prisma.car.create({
      data: {
        userId: user?.id,
        ...req.body,
      },
    });

    if (!car) return res.status(404).json({ message: "Car not added" });

    return res.status(201).json(car);
  }
}
