import { zodResolver } from '@hookform/resolvers/zod';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import { z } from 'zod';

const createProjectFormSchema = (userRole: UserRolesEnum | string) =>
  z.object({
    name: z.string().nonempty('O Nome é obrigatório'),
    type: z.string().optional(),
    expected_start: z.date({
      invalid_type_error: 'A Data de Início é obrigatória',
      required_error: 'A Data de Início é obrigatória',
    }),
    expected_end: z.date({
      invalid_type_error: 'A Data de Encerramento é obrigatória',
      required_error: 'A Data de Encerramento é obrigatória',
    }),
    workstation: z.string().nonempty('O Posto de Trabalho é obrigatório'),
    customer_admin_user_id: z.object(
      {
        value: z.string().nonempty('O Especialista Responsável é obrigatório'),
        label: z.string().nonempty('O Especialista Responsável é obrigatório'),
      },
      { required_error: 'O Especialista Responsável é obrigatório' }
    ),
    health_users_id: z
      .array(
        z.object({
          value: z.string().nonempty('A Equipe de Saúde é obrigatória'),
          label: z.string().nonempty('A Equipe de Saúde é obrigatória'),
        })
      )
      .optional(),
    viewer_users_id: z
      .array(
        z.object({
          value: z.string().nonempty('A Equipe de Apoio é obrigatória'),
          label: z.string().nonempty('A Equipe de Apoio é obrigatória'),
        })
      )
      .optional(),
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

export type CreateProjectFormData = z.infer<
  ReturnType<typeof createProjectFormSchema>
>;

export const createProjectFormResolver = (userRole: UserRolesEnum | string) =>
  zodResolver(createProjectFormSchema(userRole));
