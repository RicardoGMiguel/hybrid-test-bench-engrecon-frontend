import { zodResolver } from '@hookform/resolvers/zod';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import { TranslateRolePT } from '@modules/users/utils/translateRoleToPT';
import { z } from 'zod';

const createUserFormSchema = (userRole: UserRolesEnum | string) =>
  z
    .object({
      name: z.string().nonempty('O Nome é obrigatório'),
      email: z
        .string()
        .nonempty('O E-mail é obrigatório')
        .email('E-mail inválido'),
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
      role: z.object(
        {
          value: z.string().nonempty('O Nível de Acesso é obrigatório'),
          label: z.string().nonempty('O Nível de Acesso é obrigatório'),
        },
        { required_error: 'O Nível de Acesso é obrigatório' }
      ),
      customer_id: z
        .object({
          value: z.string().nonempty('A Empresa é obrigatória'),
          label: z.string().nonempty('A Empresa é obrigatória'),
        })
        .optional(),
    })
    .superRefine((data, ctx) => {
      if (
        userRole === UserRolesEnum.GLOBAL_ADMIN &&
        data.role.value !== TranslateRolePT(UserRolesEnum.HEALTH)
      ) {
        if (!data.customer_id) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'A empresa é obrigatória',
            path: ['customer_id'],
          });
        }
      }
    });

export type CreateUserFormData = z.infer<
  ReturnType<typeof createUserFormSchema>
>;

export const createUserFormResolver = (userRole: UserRolesEnum | string) =>
  zodResolver(createUserFormSchema(userRole));
