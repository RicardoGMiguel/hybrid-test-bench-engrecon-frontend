import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const projectEmployee = z
  .object({
    employee: z.object({
      value: z.string().nonempty('O Colaborador é obrigatório'),
      label: z.string().nonempty('O Colaborador é obrigatório'),
    }),
    group: z.object({
      value: z.string().nonempty('O Grupo é obrigatório'),
      label: z.string().nonempty('O Grupo é obrigatório'),
    }),
    equipment: z.object({
      value: z.string().optional(), // Inicialmente opcional
      label: z.string().optional(), // Inicialmente opcional
    }),
  })
  .superRefine((data, ctx) => {
    if (data.group.value === 'Teste') {
      if (!data.equipment.value || !data.equipment.label) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O Equipamento é obrigatório quando for grupo de Teste',
          path: ['equipment'],
        });
      }
    }
  });

const editProjectEmployeeFormSchema = z.object({
  selectedProjectEmployees: z.array(projectEmployee),
});

export type EditProjectEmployeeFormData = z.infer<
  typeof editProjectEmployeeFormSchema
>;

export const editProjectEmployeeFormResolver = zodResolver(
  editProjectEmployeeFormSchema
);
