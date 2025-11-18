import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editSettingsFormSchema = z
  .object({
    cardanInitialSpeed: z.string().nonempty('Velocidade inicial é obrigatória'),
    cardanEndSpeed: z.string().nonempty('Velocidade final é obrigatória'),
    cardanTestTotalTime: z.string().nonempty('Tempo de rampa é obrigatório'),
    couplingInstant: z
      .string()
      .nonempty('Instante de acoplamento é obrigatório'),
  })
  .refine(
    (data) => {
      const totalTime = parseFloat(data.cardanTestTotalTime);
      const coupling = parseFloat(data.couplingInstant);
      // Usa Number.isNaN() em vez de isNaN()
      return (
        !Number.isNaN(totalTime) &&
        !Number.isNaN(coupling) &&
        coupling <= totalTime
      );
    },
    {
      message:
        'O instante de acoplamento não pode ser maior que o tempo total de rampa.',
      path: ['couplingInstant'], // campo que receberá a mensagem
    }
  );

export type EditSettingsFormData = z.infer<typeof editSettingsFormSchema>;

export const editSettingsFormResolver = zodResolver(editSettingsFormSchema);
