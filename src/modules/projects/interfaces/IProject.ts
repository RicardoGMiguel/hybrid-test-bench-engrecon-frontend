import { ICustomer } from '@modules/customers/interfaces/ICustomer';
import { IUser } from '@modules/users/interfaces/IUser';
import { IProjectEmployee } from './IProjectEmployee';

export interface IProject {
  id: string;
  name: string;
  type: string;
  roi_spreadsheet: string | null;
  attendance_list: string | null;
  electromyography: string | null;
  ergonomic_evaluation_aep: string | null;
  ergonomic_evaluation_aet: string | null;
  expected_start: Date;
  expected_end: Date;
  workstation: string;
  customer_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  roi_spreadsheet_url: string;
  attendance_list_url: string;
  electromyography_url: string;
  ergonomic_evaluation_aep_url: string;
  ergonomic_evaluation_aet_url: string;
  customer: ICustomer;
  customer_admin_user: IUser;
  project_employees: IProjectEmployee[];
  health_users?: IUser[];
  viewer_users?: IUser[];
}

export interface IShowProject {
  id: string;
  name: string;
  type: string;
  roi_spreadsheet: string | null;
  attendance_list: string | null;
  electromyography: string | null;
  ergonomic_evaluation_aep: string | null;
  ergonomic_evaluation_aet: string | null;
  expected_start: Date;
  expected_end: Date;
  workstation: string;
  customer_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  customer: ICustomer;
  roi_spreadsheet_url: string;
  attendance_list_url: string;
  electromyography_url: string;
  ergonomic_evaluation_aep_url: string;
  ergonomic_evaluation_aet_url: string;
  customer_admin_user: IUser;
  health_users?: IUser[];
  viewer_users?: IUser[];
  test_employees: IProjectEmployee[];
  control_employees: IProjectEmployee[];
}

export interface IFormCreateProject {
  name: string;
  type?: string;
  expected_start: Date;
  expected_end: Date;
  workstation: string;
  customer_admin_user_id: string;
  health_users_id: string[];
  viewer_users_id: string[];
  customer_id?: string;
}

export interface IFormUpdateProject {
  name: string;
  type?: string;
  expected_start: Date;
  expected_end: Date;
  workstation: string;
  customer_admin_user_id: string;
  health_users_id: string[];
  viewer_users_id: string[];
}
