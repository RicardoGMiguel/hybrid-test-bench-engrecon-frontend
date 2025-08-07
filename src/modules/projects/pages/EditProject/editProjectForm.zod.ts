import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editProjectFormSchema = z.object({
  name: z.string().nonempty('O Nome é obrigatório'),
  type: z.string().optional(),
  expected_start: z.date({
    invalid_type_error: 'A Data de Início Prevista é obrigatória',
    required_error: 'A Data de Início Prevista é obrigatória',
  }),
  expected_end: z.date({
    invalid_type_error: 'A Data de Encerramento Prevista é obrigatória',
    required_error: 'A Data de Encerramento Prevista é obrigatória',
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
});

export type EditProjectFormData = z.infer<typeof editProjectFormSchema>;

export const editProjectFormResolver = zodResolver(editProjectFormSchema);
