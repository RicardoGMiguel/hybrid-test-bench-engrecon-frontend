import { IEmployee } from '@modules/employees/interfaces/IEmployee';
import { IAutoEvaluation } from './IAutoEvaluation';
import { IKinesisEvaluation } from './IKinesisEvaluation';
import { ISensor } from './ISensor';

export interface IEmployeeEvaluation {
  id: string;
  project_id: string;
  employee_id: string;
  equipment_id: string;
  is_present: boolean | null;
  created_at: Date;
  updated_at: Date;
  employee: IEmployee;
  auto_evaluation: IAutoEvaluation | null;
  kinesis_functional_evaluation: IKinesisEvaluation;
  exy_sensor: ISensor | null;
  other_sensor: ISensor | null;
}

export interface IChartData {
  pending: number;
  done: number;
  total: number;
}

export interface IEvaluations {
  test_employees: IEmployeeEvaluation[];
  control_employees: IEmployeeEvaluation[];
  auto_evaluation_chart: IChartData;
  kinesis_functional_chart: IChartData;
}
