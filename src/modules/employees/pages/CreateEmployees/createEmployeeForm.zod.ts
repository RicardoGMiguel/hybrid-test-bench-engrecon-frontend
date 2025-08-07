import { zodResolver } from '@hookform/resolvers/zod';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import { z } from 'zod';

const createEmployeeFormSchema = (userRole: UserRolesEnum | string) =>
  z.object({
    name: z.string().nonempty('O Nome é obrigatório'),
    position: z.string().nonempty('O Cargo é obrigatório'),
    professional_registry: z.string().nonempty('O Registro é obrigatório'),
    birth_date: z.date({
      invalid_type_error: 'A Data de Nascimento é obrigatória',
      required_error: 'A Data de Nascimento é obrigatória',
    }),
    gender: z.object(
      {
        value: z.string().nonempty('O Gênero é obrigatório'),
        label: z.string().nonempty('O Gênero é obrigatório'),
      },
      { required_error: 'O Gênero é obrigatório' }
    ),
    height: z.string().nonempty('A Altura é obrigatória'),
    weight: z.string().nonempty('O Peso é obrigatório'),
    imc: z.string().optional(),
    activity_time: z.string().nonempty('O Tempo de experiência é obrigatório'),
    customer_id:
      userRole === UserRolesEnum.GLOBAL_ADMIN ||
      userRole === UserRolesEnum.HEALTH
        ? z.object(
            {
              value: z.string().nonempty('A Empresa é obrigatória'),
              label: z.string().nonempty('A Empresa é obrigatória'),
            },
            { required_error: 'A Empresa é obrigatório' }
          )
        : z
            .object({
              value: z.string().optional(),
              label: z.string().optional(),
            })
            .optional(),
  });

export type CreateEmployeeFormData = z.infer<
  ReturnType<typeof createEmployeeFormSchema>
>;

export const createEmployeeFormResolver = (userRole: UserRolesEnum | string) =>
  zodResolver(createEmployeeFormSchema(userRole));
