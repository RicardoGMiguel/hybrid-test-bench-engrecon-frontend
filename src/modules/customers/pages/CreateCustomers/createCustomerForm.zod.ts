import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createCustomerFormSchema = z.object({
  name: z.string().nonempty('O Nome é obrigatório'),
  cnpj: z
    .string()
    .nonempty('O CNPJ é obrigatório')
    .refine(
      (value) => {
        if (!value) return true;
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length === 14;
      },
      {
        message: 'O CNPJ deve conter 14 dígitos numéricos',
      }
    ),
  address_zipcode: z
    .string()
    .nonempty('O CEP é obrigatório')
    .refine(
      (value) => {
        if (!value) return true;
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length === 8;
      },
      {
        message: 'O CEP deve conter 8 dígitos numéricos',
      }
    ),
  address_street: z.string().nonempty('A Rua é obrigatória'),
  address_number: z.string().nonempty('O Número é obrigatório'),
  address_complement: z.string().optional().nullable(),
  address_district: z.string().nonempty('O Bairro é obrigatório'),
  address_city: z.string().nonempty('A Cidade é obrigatória'),
  address_state: z.string().nonempty('O Estado é obrigatório'),
  email: z.string().nonempty('O E-mail é obrigatório').email('E-mail inválido'),
  phone: z.string().refine(
    (value) => {
      if (!value) return true;
      const digitsOnly = value.replace(/\D/g, '');
      return digitsOnly.length === 10;
    },
    {
      message: 'O telefone deve conter 10 dígitos numéricos',
    }
  ),
  cellphone: z.string().refine(
    (value) => {
      if (!value) return true;
      const digitsOnly = value.replace(/\D/g, '');
      return digitsOnly.length === 11;
    },
    {
      message: 'O celular deve conter 11 dígitos numéricos',
    }
  ),
  activity_branch: z.string().nonempty('O Ramo de Atividade é obrigatório'),
  company_size: z.object(
    {
      value: z.string().nonempty('O Tamanho da Empresa é obrigatório'),
      label: z.string().nonempty('O Tamanho da Empresa é obrigatório'),
    },
    { required_error: 'O Tamanho da Empresa é obrigatório' }
  ),
  project_quantity_limit: z
    .string()
    .nonempty('O Limite de Projetos é obrigatório'),
});

export type CreateCustomerFormData = z.infer<typeof createCustomerFormSchema>;

export const createCustomerFormResolver = zodResolver(createCustomerFormSchema);
