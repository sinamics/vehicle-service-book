import z from "zod";

export const repairParams = z.object({
  repairId: z.string(),
  carId: z.string(),
});

export const createRepairSchema = z.object({
  params: repairParams,
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number().optional(),
    date: z.string().optional(),
    mileage: z.number().optional(),
  }),
});

export const updateRepairSchema = z.object({
  params: repairParams,
  body: z
    .object({
      title: z.string(),
      description: z.string(),
      price: z.number(),
      date: z.string(),
      mileage: z.number(),
    })
    .partial(),
});

export type RepairParams = z.infer<typeof repairParams>;
export type CreateRepairSchema = z.infer<typeof createRepairSchema>;
export type UpdateRepairSchema = z.infer<typeof updateRepairSchema>;
