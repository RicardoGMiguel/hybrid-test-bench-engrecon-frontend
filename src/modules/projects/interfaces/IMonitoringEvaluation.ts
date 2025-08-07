import { EquipmentBeingUsedEnum } from '../components/StepContents/types/EquipmentBeingUsedEnum';
import { WeekMonitoringEnum } from '../components/StepContents/types/WeekMonitoringEnum';

export interface IMonitoringEvaluation {
  id: string;
  evaluation_user_id: string;
  project_employee_id: string;
  week: WeekMonitoringEnum;
  evaluation_number: number;
  equipment_being_used: EquipmentBeingUsedEnum;
  pain_description: string | null;
  observation: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface IFormCreateMonitoringEvaluation {
  project_employee_id: string;
  week: WeekMonitoringEnum;
  evaluation_number: number;
  equipment_being_used: EquipmentBeingUsedEnum | string;
  pain_description?: string | null;
  observation?: string | null;
}

export interface IFormUpdateMonitoringEvaluation {
  equipment_being_used: EquipmentBeingUsedEnum | string;
  pain_description?: string | null;
  observation?: string | null;
}
