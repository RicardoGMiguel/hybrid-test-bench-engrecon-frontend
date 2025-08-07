import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().nonempty('O E-mail é obrigatório').email('E-mail inválido'),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(8, 'A senha deve ter 8 ou mais caracteres'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const loginFormResolver = zodResolver(loginFormSchema);
