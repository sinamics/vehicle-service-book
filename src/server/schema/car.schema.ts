import { CarType, EngineType, GearboxType } from "@prisma/client";
import z from "zod";

export const carParams = z.object({
  carId: z.string(),
});

export const createCarSchema = z.object({
  type: z.nativeEnum(CarType).optional().nullable(),
  brand: z.string({
    required_error: "Brand is required",
  }),
  model: z.string({
    required_error: "Model is required",
  }),
  generation: z.string().optional().nullable(),
  productionYear: z.number().optional().nullable(),
  engineType: z.nativeEnum(EngineType).optional().nullable(),
  engineCapacity: z.number().optional().nullable(),
  enginePower: z.number().optional().nullable(),
  gearboxType: z.nativeEnum(GearboxType).optional().nullable(),
});

export const updateCarSchema = z.object({
  params: carParams,
  body: z.object({
    type: z.nativeEnum(CarType).optional().nullable(),
    brand: z.string().optional().nullable(),
    model: z.string().optional().nullable(),
    generation: z.string().optional().nullable(),
    productionYear: z.number().optional().nullable(),
    engineType: z.nativeEnum(EngineType).optional().nullable(),
    engineCapacity: z.number().optional().nullable(),
    enginePower: z.number().optional().nullable(),
    gearboxType: z.nativeEnum(GearboxType).optional().nullable(),
  }),
});

export type CarParams = z.infer<typeof carParams>;
export type CreateCarSchema = z.infer<typeof createCarSchema>;
export type UpdateCarSchema = z.infer<typeof updateCarSchema>;
