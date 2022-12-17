import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

import { authSchema } from "@/server/schema/auth.schema";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const authRouter = router({
  register: publicProcedure
    .input(authSchema)
    .mutation(async ({ input, ctx }) => {
      const exists = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email is invalid or already taken",
        });
      }

      const hashedPassword = await hash(input.password);

      const result = await ctx.prisma.user.create({
        data: {
          email: input.email,
          hash: hashedPassword,
        },
      });

      console.log("result:", result);

      return result;
    }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
});
