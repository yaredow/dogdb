import { z } from "zod";

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),

  bio: z
    .string()
    .max(250, { message: "Bio must not exceed 250 characters" })
    .optional(),

  image: z.instanceof(File).optional(),

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
});

export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;
