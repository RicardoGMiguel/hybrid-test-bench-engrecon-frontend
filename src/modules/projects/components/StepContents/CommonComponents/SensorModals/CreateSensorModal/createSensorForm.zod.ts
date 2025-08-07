import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createSensorFormSchema = z.object({
  project_employee_id: z.object(
    {
      value: z.string().nonempty('O Funcionário obrigatório'),
      label: z.string().nonempty('O Funcionário é obrigatório'),
    },
    { required_error: 'O Funcionário é obrigatório' }
  ),
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

export type CreateSensorFormData = z.infer<typeof createSensorFormSchema>;

export const createSensorFormResolver = zodResolver(createSensorFormSchema);
