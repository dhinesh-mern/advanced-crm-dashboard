import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .string()
    .email("Enter a valid email"),

  phone: z
    .string()
    .regex(
      /^[0-9+\-\s()]{10,15}$/,
      "Enter a valid phone number"
    ),

  company: z.string().min(1, "Company is required"),

  avatar: z.string().optional(),

  notes: z.string().optional(),

  status: z.enum(["Active", "Inactive"]),
});

export type CustomerFormValues =
  z.infer<typeof customerSchema>;