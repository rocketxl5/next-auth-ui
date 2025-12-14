import { z } from 'zod';

const nameSchema = z
  .string()
  .trim()
  .min(3, { message: 'Name must be at least 3 characters long' })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: 'Name can only contain letters and numbers',
  });

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email({ message: 'Invalid email address' });

const passwordSchma = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[a-z]/, { message: 'Password must contain a lowercase letter' })
  .regex(/[A-Z]/, { message: 'Password must contain an uppercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain a number' })
  .regex(/^\S+$/, { message: 'Password must not contain spaces' });

const roleEnum = z.enum(['USER', 'AUTHOR', 'EDITOR', 'ADMIN', 'SUPER_ADMIN']);

export const createUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchma,
  role: roleEnum.default('USER'),
});

export const updateUserSchema = z.object({
  name: nameSchema.optional(),
  email: z.string().email({ message: 'Invalid email format' }).optional(),
  role: roleEnum.optional(),
});
