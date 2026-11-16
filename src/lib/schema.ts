import { z } from "zod";

export const earlyAccessSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name must be under 80 characters."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),
  countryCode: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/, "Invalid country code."),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s\-()]/g, ""))
    .refine((val) => /^\d{7,15}$/.test(val), {
      message: "Please enter a valid phone number (digits only).",
    }),
  // Honeypot anti-spam field (must stay empty)
  website: z.string().max(0),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;