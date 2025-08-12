import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editSettingsFormSchema = z.object({
  cardanSpeed: z.string().nonempty('Velocidade do cardan é obrigatória'),
  rampTime: z.string().nonempty('Tempo de rampa é obrigatório'),
});

export type EditSettingsFormData = z.infer<typeof editSettingsFormSchema>;

export const editSettingsFormResolver = zodResolver(editSettingsFormSchema);
