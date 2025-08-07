import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editEquipmentFormSchema = z.object({
  name: z.string().nonempty('O Nome é obrigatório'),
  code: z.string().nonempty('O Código é obrigatório'),
  type: z.object(
    {
      value: z.string().nonempty('O Tipo do Equipamento é obrigatório'),
      label: z.string().nonempty('O Tipo do Equipamento é obrigatório'),
    },
    { required_error: 'O Tipo do Equipamento é obrigatório' }
  ),
  size: z.object(
    {
      value: z.string().nonempty('O Tamanho do Equipamento é obrigatório'),
      label: z.string().nonempty('O Tamanho do Equipamento é obrigatório'),
    },
    { required_error: 'O Tamanho do Equipamento é obrigatório' }
  ),
  has_sensors: z.object(
    {
      value: z.boolean(),
      label: z.string().nonempty('Seleção obrigatória'),
    },
    {
      required_error: 'Seleção obrigatória',
    }
  ),
  has_iot: z.object(
    {
      value: z.boolean(),
      label: z.string().nonempty('Seleção obrigatória'),
    },
    {
      required_error: 'Seleção obrigatória',
    }
  ),
});

export type EditEquipmentFormData = z.infer<typeof editEquipmentFormSchema>;

export const editEquipmentFormResolver = zodResolver(editEquipmentFormSchema);
