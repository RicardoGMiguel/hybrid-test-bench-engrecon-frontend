import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const changePasswordFirstLoginFormSchema = z
  .object({
    password: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(8, 'A senha deve ter 8 ou mais caracteres'),
    confirmation: z
      .string()
      .nonempty('A confirmação é obrigatória')
      .min(8, 'A confirmação deve ter 8 ou mais caracteres'),
  })
  .refine((data) => data.password === data.confirmation, {
    message: 'A senha e a confirmação não coincidem',
    path: ['confirmation'],
  });

export type ChangePasswordFirstLoginFormData = z.infer<
  typeof changePasswordFirstLoginFormSchema
>;

export const changePasswordFirstLoginFormResolver = zodResolver(
  changePasswordFirstLoginFormSchema
);
