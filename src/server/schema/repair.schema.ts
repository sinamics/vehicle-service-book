import z from "zod";

export const repairParams = z.object({
  repairId: z.string(),
  carId: z.string(),
});

export const createRepairSchema = z.object({
  params: repairParams.pick({ carId: true }),
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string().optional().nullable(),
    price: z.number().optional().nullable(),
    date: z.string().optional().nullable(),
    mileage: z.number().optional().nullable(),
  }),
});

export const updateRepairSchema = z.object({
  params: repairParams,
  body: z.object({
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.number().optional().nullable(),
    date: z.string().optional().nullable(),
    mileage: z.number().optional().nullable(),
  }),
});

export type RepairParams = z.infer<typeof repairParams>;
export type CreateRepairSchema = z.infer<typeof createRepairSchema>;
export type UpdateRepairSchema = z.infer<typeof updateRepairSchema>;
