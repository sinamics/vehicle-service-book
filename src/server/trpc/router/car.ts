import { TRPCError } from "@trpc/server";
import z from "zod";

import { protectedProcedure, router } from "@/server/trpc/trpc";

export const carRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const cars = await ctx.prisma.car.findMany({
      where: {
        userId: ctx.session.user.id,
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

    if (!cars?.length)
      throw new TRPCError({ code: "NOT_FOUND", message: "No cars found" });

    return cars;
  }),
  getOne: protectedProcedure
    .input(z.object({ carId: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const car = await ctx.prisma.car.findFirst({
        where: {
          id: input.carId,
          userId: ctx.session.user.id,
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

      if (!car)
        throw new TRPCError({ code: "NOT_FOUND", message: "No car found" });

      return car;
    }),
  create: protectedProcedure
    .input(
      z.object({
        type: z.string().optional(),
        brand: z.string().optional(),
        model: z.string().optional(),
        generation: z.string().optional(),
        productionYear: z.number().optional(),
        engineType: z.string().optional(),
        engineCapacity: z.number().optional(),
        enginePower: z.number().optional(),
        gearboxType: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return {};
    }),
});
