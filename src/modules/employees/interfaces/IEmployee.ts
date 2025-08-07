import { ICustomer } from '@modules/customers/interfaces/ICustomer';

export interface IEmployee {
  id: string;
  name: string;
  professional_registry: string;
  position: string;
  birth_date: Date;
  gender: string;
  weight: number;
  height: number;
  imc: number;
  activity_time: string;
  customer_id: string;
  created_at: Date;
  updated_at: Date;
  customer: ICustomer;
}

export interface IFormCreateEmployee {
  name: string;
  professional_registry: string;
  position: string;
  birth_date: Date;
  gender: string;
  height: number;
  weight: number;
  activity_time: string;
  customer_id?: string;
}

export interface IFormUpdateEmployee {
  name: string;
  professional_registry: string;
  position: string;
  birth_date: Date;
  gender: string;
  height: number;
  weight: number;
  activity_time: string;
}
