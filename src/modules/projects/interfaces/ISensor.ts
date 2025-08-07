import { EvaluationStageEnum } from '../types/EvaluationStageEnum';
import { SensorTypeEnum } from '../types/SensorTypeEnum';
import { IProjectEmployee } from './IProjectEmployee';

export interface ISensor {
  id: string;
  project_employee_id: string;
  evaluation_type: EvaluationStageEnum;
  sensor_type: SensorTypeEnum;
  name: string;
  result_description: string;
  observation: string;
  started_at: Date;
  ended_at: Date;
  created_at: Date;
  updated_at: Date;
  project_employee: IProjectEmployee;
}

export interface IFormCreateSensor {
  project_employee_id: string;
  evaluation_type: EvaluationStageEnum;
  sensor_type: SensorTypeEnum;
  name: string;
  result_description: string;
  observation?: string | null;
  started_at: Date;
  ended_at: Date;
}

export interface IFormUpdateSensor {
  name: string;
  result_description: string;
  observation?: string | null;
  started_at: Date;
  ended_at: Date;
}
