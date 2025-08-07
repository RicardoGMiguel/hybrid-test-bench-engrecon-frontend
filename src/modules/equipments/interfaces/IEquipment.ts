import { ICustomer } from '@modules/customers/interfaces/ICustomer';

export interface IEquipment {
  id: string;
  name: string;
  code: string;
  type: string;
  size: string;
  has_sensors: boolean;
  has_iot: boolean;
  customer_id: string;
  customer: ICustomer;
  created_at: Date;
  updated_at: Date;
}

export interface IFormCreateEquipment {
  name: string;
  code: string;
  type: string;
  size: string;
  has_sensors: boolean;
  has_iot: boolean;
  customer_id: string;
}

export interface IFormUpdateEquipment {
  name: string;
  code: string;
  type: string;
  size: string;
  has_sensors: boolean;
  has_iot: boolean;
}
