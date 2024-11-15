import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  twoFactor: z.optional(z.string()),
});

export type SigninData = z.infer<typeof SigninSchema>;

export const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),

  email: z.string().email({ message: "Please enter a valid email address" }),

  birthDate: z
    .date({
      required_error: "Birth date is required",
      invalid_type_error: "Please provide a valid date",
    })
    .refine(
      (date) => {
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        return age >= 18; // Adjust the age as per your requirement
      },
      { message: "You must be at least 18 years old" },
    ),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Za-z]/, { message: "Password must contain at least one letter" })
    .regex(/\d/, { message: "Password must contain at least one number" }),
  breeds: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

export type SignupData = z.infer<typeof SignupSchema>;

export const PostSignupSchema = z.object({
  breed: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
});

export type PostSignupSchemaData = z.infer<typeof PostSignupSchema>;
