import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editEmployeeFormSchema = z.object({
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
});

export type EditEmployeeFormData = z.infer<typeof editEmployeeFormSchema>;

export const editEmployeeFormResolver = zodResolver(editEmployeeFormSchema);
