import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editCyclesSettingsFormSchema = z
  .object({
    brakeTorque: z.string().nonempty('Brake torque is required'),
  })
  .refine(
    (data) => {
      const pi = 3.1416;
      const pumpDisplacement = 50; // ccm
      const pressurePa =
        (2 * pi * 1000000 * Number(data.brakeTorque)) / pumpDisplacement;
      const pressureBar = pressurePa / 100000;

      return !Number.isNaN(data.brakeTorque) && pressureBar <= 300;
    },
    {
      message: 'Hydraulic brake pressure must be less than 300 bar.',
      path: ['brakeTorque'], // campo que receberá a mensagem
    }
  );

export type EditCyclesSettingsFormData = z.infer<
  typeof editCyclesSettingsFormSchema
>;

export const editCyclesSettingsFormResolver = zodResolver(
  editCyclesSettingsFormSchema
);
