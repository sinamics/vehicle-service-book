import type { NextApiRequest, NextApiResponse } from "next";

import { checkSession } from "@/common/checkSession";
import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await checkSession(req, res);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { carId, repairId } = req.query;

  if (req.method === "GET") {
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
  }

  if (req.method === "PUT") {
    const repair = await prisma.repair.findUnique({
      where: {
        id: String(repairId),
      },
      include: {
        car: true,
      },
    });

    if (!repair || repair.carId !== String(carId)) {
      return res.status(404).json({ message: "No repair found" });
    }

    if (repair.car.userId !== user?.id) {
      return res.status(403).json({ message: "Access to resources denied" });
    }

    // TODO: Zwaliduj dane z req.body zanim wyślesz do bazy
    return prisma.repair.update({
      where: {
        id: String(repairId),
      },
      data: {
        ...req.body,
      },
    });
  }

  if (req.method === "DELETE") {
    const repair = await prisma.repair.findUnique({
      where: {
        id: String(repairId),
      },
      include: {
        car: true,
      },
    });

    if (!repair || repair.carId !== String(carId)) {
      return res.status(404).json({ message: "No repair found" });
    }

    if (repair.car.userId !== user?.id) {
      return res.status(403).json({ message: "Access to resources denied" });
    }

    await prisma.repair.delete({
      where: {
        id: String(repairId),
      },
    });

    return res.status(204).json({});
  }
}
