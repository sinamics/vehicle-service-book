import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";

export async function checkSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  if (!session) {
    res.status(401).send("Unauthorized");
  }

  return session?.user;
}
