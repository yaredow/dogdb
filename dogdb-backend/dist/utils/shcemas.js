"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormSchema = exports.SigninFormSchema = void 0;
const zod_1 = require("zod");
exports.SigninFormSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4),
    twoFactor: zod_1.z.optional(zod_1.z.string()),
});
exports.SignupFormSchema = zod_1.z
    .object({
    firstName: zod_1.z
        .string()
        .min(1, { message: "First name is required" })
        .max(100),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }).max(100),
    email: zod_1.z.string().email({ message: "Please enter a valid email." }).trim(),
    password: zod_1.z
        .string()
        .min(8, { message: "Be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
        .regex(/[0-9]/, { message: "Contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
    })
        .trim(),
    passwordConfirm: zod_1.z.string().trim().min(8),
    breed: zod_1.z
        .array(zod_1.z.object({ value: zod_1.z.string(), label: zod_1.z.string() }))
        .optional(),
})
    .refine((data) => {
    return data.password === data.passwordConfirm;
}, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});
