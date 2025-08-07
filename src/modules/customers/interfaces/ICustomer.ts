export interface ICustomer {
  id: string;
  name: string;
  cnpj: string;
  address_zipcode: string;
  address_street: string;
  address_number: number;
  address_complement: string;
  address_district: string;
  address_city: string;
  address_state: string;
  email: string;
  phone?: string;
  cellphone?: string;
  activity_branch: string;
  company_size: string;
  project_quantity_limit: number;
  created_at: Date;
  updated_at: Date;
}

export interface IFormCreateCustomer {
  name: string;
  cnpj: string;
  address_zipcode: string;
  address_street: string;
  address_number: number;
  address_complement?: string | null;
  address_district: string;
  address_city: string;
  address_state: string;
  email: string;
  phone?: string | null;
  cellphone?: string | null;
  activity_branch: string;
  company_size: string;
  project_quantity_limit: number;
}

export interface IFormUpdateCustomer {
  name: string;
  cnpj: string;
  address_zipcode: string;
  address_street: string;
  address_number: number;
  address_complement?: string | null;
  address_district: string;
  address_city: string;
  address_state: string;
  email: string;
  phone?: string | null;
  cellphone?: string | null;
  activity_branch: string;
  company_size: string;
  project_quantity_limit: number;
}
