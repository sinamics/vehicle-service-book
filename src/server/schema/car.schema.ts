import { CarType, EngineType, GearboxType } from "@prisma/client";
import z from "zod";

export const carParams = z.object({
  carId: z.string(),
});

export const createCarSchema = z.object({
  type: z.nativeEnum(CarType).optional(),
  brand: z.string({
    required_error: "Brand is required",
  }),
  model: z.string({
    required_error: "Model is required",
  }),
  generation: z.string().optional(),
  productionYear: z.number().optional(),
  engineType: z.nativeEnum(EngineType).optional(),
  engineCapacity: z.number().optional(),
  enginePower: z.number().optional(),
  gearboxType: z.nativeEnum(GearboxType).optional(),
});

export const updateCarSchema = z.object({
  params: carParams,
  body: z
    .object({
      type: z.nativeEnum(CarType),
      brand: z.string(),
      model: z.string(),
      generation: z.string(),
      productionYear: z.number(),
      engineType: z.nativeEnum(EngineType),
      engineCapacity: z.number(),
      enginePower: z.number(),
      gearboxType: z.nativeEnum(GearboxType),
    })
    .partial(),
});

export type CarParams = z.infer<typeof carParams>;
export type CreateCarSchema = z.infer<typeof createCarSchema>;
export type UpdateCarSchema = z.infer<typeof updateCarSchema>;
