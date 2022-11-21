import { TRPCError } from "@trpc/server";

import {
  carParams,
  createCarSchema,
  updateCarSchema,
} from "@/server/schema/car.schema";
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
      throw new TRPCError({ code: "NOT_FOUND", message: "Cars not found" });

    return cars;
  }),
  getOne: protectedProcedure.input(carParams).query(async ({ input, ctx }) => {
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
      throw new TRPCError({ code: "NOT_FOUND", message: "Car not found" });

    return car;
  }),
  create: protectedProcedure
    .input(createCarSchema)
    .mutation(async ({ input, ctx }) => {
      const car = await ctx.prisma.car.create({
        data: {
          userId: ctx.session.user.id,
          ...input,
        },
      });

      if (!car)
        throw new TRPCError({ code: "NOT_FOUND", message: "Car not added" });

      return car;
    }),
  update: protectedProcedure
    .input(updateCarSchema)
    .mutation(async ({ input, ctx }) => {
      const car = await ctx.prisma.car.findUnique({
        where: {
          id: input.params.carId,
        },
      });

      if (!car) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Car not found" });
      }

      if (car.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Denied access to resources",
        });
      }

      const { brand, model, ...restBody } = input.body;
      
      return await ctx.prisma.car.update({
        where: {
          id: input.params.carId,
        },
        data: {
          brand: brand || car.brand,
          model: model || car.model,
          ...restBody,
        },
      });
    }),
  delete: protectedProcedure
    .input(carParams)
    .mutation(async ({ input, ctx }) => {
      const car = await ctx.prisma.car.findUnique({
        where: {
          id: input.carId,
        },
      });

      if (!car) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Car not found" });
      }

      if (car.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Denied access to resources",
        });
      }
      await ctx.prisma.car.delete({
        where: {
          id: input.carId,
        },
      });

      return {};
    }),
});
