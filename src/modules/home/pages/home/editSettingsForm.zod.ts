import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editSettingsFormSchema = z.object({
  initialSpeed: z.string().nonempty('Velocidade inicial é obrigatória'),
  endSpeed: z.string().nonempty('Velocidade final é obrigatória'),
  rampTime: z.string().nonempty('Tempo de rampa é obrigatório'),
  couplingInstant: z.string().nonempty('Instante de acoplamento é obrigatório'),
});

export type EditSettingsFormData = z.infer<typeof editSettingsFormSchema>;

export const editSettingsFormResolver = zodResolver(editSettingsFormSchema);
