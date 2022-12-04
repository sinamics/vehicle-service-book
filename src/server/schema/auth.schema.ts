import z from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email must contain at least 3 characters" })
    .max(255, { message: "Email must contain at most 255 characters" })
    .email({ message: "Email must be a valid email address" }),
  password: z
    .string()
    .min(12, { message: "Password must contain at least 12 characters" })
    .max(255, { message: "Password must contain at most 255 characters" }),
});

export type AuthSchema = z.infer<typeof authSchema>;
