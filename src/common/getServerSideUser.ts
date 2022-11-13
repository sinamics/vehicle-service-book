import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

import prisma from "@/lib/prismadb";

export async function getServerSideUser(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) return null;

  return await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      id: true,
      email: true,
      emailVerified: true,
      name: true,
      image: true,
      firstName: true,
      lastName: true,
    },
  });
}
