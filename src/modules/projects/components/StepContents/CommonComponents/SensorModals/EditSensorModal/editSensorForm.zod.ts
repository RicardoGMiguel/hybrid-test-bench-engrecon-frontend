import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editSensorFormSchema = z.object({
  project_employee_id: z
    .object({
      value: z.string().optional(),
      label: z.string().optional(),
    })
    .optional(),
  started_at: z.date({
    invalid_type_error: 'A Data de Início é obrigatória',
    required_error: 'A Data de Início é obrigatória',
  }),
  ended_at: z.date({
    invalid_type_error: 'A Data de Encerramento é obrigatória',
    required_error: 'A Data de Encerramento é obrigatória',
  }),
  result_description: z
    .string()
    .nonempty('A descrição do método e resultados é obrigatória'),
  observation: z.string().optional().nullable(),
});

export type EditSensorFormData = z.infer<typeof editSensorFormSchema>;

export const editSensorFormResolver = zodResolver(editSensorFormSchema);
