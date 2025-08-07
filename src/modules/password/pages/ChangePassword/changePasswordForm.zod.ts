import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const changePasswordFormSchema = z
  .object({
    old_password: z
      .string()
      .nonempty('A senha atual é obrigatória')
      .min(8, 'A senha atual deve ter 8 ou mais caracteres'),
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

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;

export const changePasswordFormResolver = zodResolver(changePasswordFormSchema);
