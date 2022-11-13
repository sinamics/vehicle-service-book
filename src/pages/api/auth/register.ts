import { hash } from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (!exists) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const hashedPassword = await hash(password);

    const result = await prisma.user.create({
      data: {
        email,
        hash: hashedPassword,
      },
    });

    return res.status(201).json(result);
  }

  res.status(200).json({ message: "Hello World" });
}
