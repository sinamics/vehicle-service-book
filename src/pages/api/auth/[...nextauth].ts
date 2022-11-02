import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verify } from "argon2";
import { verifyRootLayout } from "next/dist/lib/verifyRootLayout";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import prisma from "@/lib/prismadb";

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET || "",
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Address email", type: "email", placeholder: "john@doe.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          return null;
        }

        if (!user?.hash || !credentials?.password) {
          return null;
        }

        const isValidPassword = await verify(user.hash, credentials.password);

        if (!isValidPassword) {
          return null;
        }

        const { hash, ...userWithoutHash } = user;

        return userWithoutHash;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, profile }) => {
      if (user) {
        token = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(nextAuthOptions);
