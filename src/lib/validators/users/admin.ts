import {z} from "zod";
import { emailSchema, nameSchema, passwordSchema, roleEnum } from "../common";

export const createUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: roleEnum.default('USER'),
});

export const updateUserSchema = z.object({
  name: nameSchema.optional(),
  email: z.string().email({ message: 'Invalid email format' }).optional(),
  role: roleEnum.optional(),
});