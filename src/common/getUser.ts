import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export async function getUser(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) return null;

  const { user } = session;
  return user;
}
