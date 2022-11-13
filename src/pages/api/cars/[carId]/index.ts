import type { NextApiRequest, NextApiResponse } from "next";

import { checkSession } from "@/common/checkSession";
import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await checkSession(req, res);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { carId } = req.query;

  if (req.method === "GET") {
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
  }

  if (req.method === "PUT") {
    const car = await prisma.car.findUnique({
      where: {
        id: String(carId),
      },
    });

    if (!car) {
      return res.status(404).json({ message: "No car found" });
    }

    if (car.userId !== user?.id) {
      return res.status(403).json({ message: "Access to resources denied" });
    }

    // TODO: Zwaliduj dane z req.body zanim wyślesz do bazy
    return await prisma.car.update({
      where: {
        id: String(carId),
      },
      data: {
        ...req.body,
      },
    });
  }

  if (req.method === "DELETE") {
    const car = await prisma.car.findUnique({
      where: {
        id: String(carId),
      },
    });

    if (!car) {
      return res.status(404).json({ message: "No car found" });
    }

    if (car.userId !== user?.id) {
      return res.status(403).json({ message: "Access to resources denied" });
    }

    await prisma.car.delete({
      where: {
        id: String(carId),
      },
    });

    return res.status(204).json({});
  }
}
