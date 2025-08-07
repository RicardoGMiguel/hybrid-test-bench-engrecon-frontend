import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editSettingsFormSchema = z.object({
  cardanSpeed: z.string(),
});

export type EditSettingsFormData = z.infer<typeof editSettingsFormSchema>;

export const editSettingsFormResolver = zodResolver(editSettingsFormSchema);
