import { IEmployee } from '@modules/employees/interfaces/IEmployee';
import { IEquipment } from '@modules/equipments/interfaces/IEquipment';

export interface IProjectEmployee {
  id: string;
  project_id: string;
  employee_id: string;
  equipment_id: string;
  is_present: boolean | null;
  created_at: Date;
  updated_at: Date;
  employee: IEmployee;
  equipment: IEquipment;
}

export interface IProjectEmployeeSendData {
  employee_id: string;
  equipment_id?: string | null;
}

export interface IFormCreateProjectEmployee {
  project_id: string;
  project_employees: IProjectEmployeeSendData[];
}
