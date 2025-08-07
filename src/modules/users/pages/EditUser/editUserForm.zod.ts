import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editUserFormSchema = z.object({
  name: z.string().nonempty('O Nome é obrigatório'),
  email: z.string().nonempty('O E-mail é obrigatório').email('E-mail inválido'),
  phone: z
    .string()
    .optional()
    .nullable()
    .refine(
      (value) => {
        if (!value) return true;
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length === 10;
      },
      {
        message: 'O telefone deve conter 10 dígitos numéricos',
      }
    ),
  cellphone: z
    .string()
    .optional()
    .nullable()
    .refine(
      (value) => {
        if (!value) return true;
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length === 11;
      },
      {
        message: 'O celular deve conter 11 dígitos numéricos',
      }
    ),
  professional_registry: z
    .string()
    .nonempty('O Registro Profissional é obrigatório'),
  cpf: z
    .string()
    .nonempty('O CPF é obrigatório')
    .refine(
      (value) => {
        if (!value) return true;
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length === 11;
      },
      {
        message: 'O CPF deve conter 11 dígitos numéricos',
      }
    ),
  position: z.string().nonempty('O Cargo é obrigatório'),
  password: z.string().optional(),
  oldPassword: z.string().optional(),
});

export type EditUserFormData = z.infer<typeof editUserFormSchema>;

export const editUserFormResolver = zodResolver(editUserFormSchema);
