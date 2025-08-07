import { PainLocationsEnum } from '../components/StepContents/types/PainLocationsEnum';
import { EvaluationStageEnum } from '../types/EvaluationStageEnum';

export interface IKinesisEvaluation {
  id: string;
  evaluation_user_id: string;
  project_employee_id: string;
  has_pain: boolean;
  pain_level: number;
  pain_location: PainLocationsEnum;
  kinesis_funcional_file: string;
  kinesis_funcional_file_url: string;
  evaluation_type: EvaluationStageEnum;
  created_at: Date;
  updated_at: Date;
}

export interface IFormCreateKinesisEvaluation {
  has_pain: boolean;
  pain_level?: number | null;
  pain_location?: string | null;
  evaluation_type: string;
  project_employee_id: string;
}

export interface IFormUpdateKinesisEvaluation {
  has_pain: boolean;
  pain_level?: number | null;
  pain_location?: string | null;
}
