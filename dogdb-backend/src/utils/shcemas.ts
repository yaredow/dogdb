import { z } from "zod";

export const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  twoFactor: z.optional(z.string()),
});

export type SigninFormDataType = z.infer<typeof SignupFormSchema>;

export const SignupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(100),
    lastName: z.string().min(1, { message: "Last name is required" }).max(100),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    passwordConfirm: z.string().trim().min(8),
    breed: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .optional(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    },
  );

export type SignupFormDataType = z.infer<typeof SignupFormSchema>;
