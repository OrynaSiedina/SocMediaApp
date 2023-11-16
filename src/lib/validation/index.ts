import * as z from 'zod';

export const SignupValidation = z.object({
  name: z.string().min(2, { message: 'Name should be at least 2 characters' }),
  username: z
    .string()
    .min(2, { message: 'Username should be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters' }),
});

export const SigninValidation = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});
export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: 'Caption should be at least 5 characters' })
    .max(2200, { message: 'Caption is too long' }),
  file: z.custom<File[]>(),
  location: z.string().optional(),
  tags: z.string().optional(),
});
