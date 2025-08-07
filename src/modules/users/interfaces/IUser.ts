import { ICustomer } from '@modules/customers/interfaces/ICustomer';

export interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  professional_registry: string;
  phone: string;
  cellphone: string;
  position: string;
  role: string;
  is_first_login: boolean;
  customer_id: string;
  customer: ICustomer;
  created_at: Date;
  updated_at: Date;
}

export interface IFormCreateUser {
  name: string;
  email: string;
  cpf: string;
  professional_registry: string;
  phone?: string | null;
  cellphone?: string | null;
  position: string;
  role: string;
  customer_id?: string;
}

export interface IFormUpdateUser {
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
  cpf: string;
  professional_registry: string;
  phone?: string | null;
  cellphone?: string | null;
  position: string;
}

export interface IFormUpdatePassword {
  password: string;
  old_password: string;
}
