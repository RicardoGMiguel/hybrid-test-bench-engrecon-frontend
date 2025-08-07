import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const selectEvaluationFormSchema = z.object({
  prevEvaluation: z.object(
    {
      value: z.string().nonempty('A avaliação inicial é obrigatória'),
      label: z.string().nonempty('A avaliação inicial é obrigatória'),
    },
    { required_error: 'A avaliação inicial é obrigatória' }
  ),
  currentEvaluation: z.object(
    {
      value: z.string().nonempty('A avaliação atual é obrigatória'),
      label: z.string().nonempty('A avaliação atual é obrigatória'),
    },
    { required_error: 'A avaliação atual é obrigatória' }
  ),
});

export type SelectEvaluationFormData = z.infer<
  typeof selectEvaluationFormSchema
>;

export const selectEvaluationFormResolver = zodResolver(
  selectEvaluationFormSchema
);
