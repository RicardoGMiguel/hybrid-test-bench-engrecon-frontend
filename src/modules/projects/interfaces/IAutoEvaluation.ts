import { EvaluationStageEnum } from '../types/EvaluationStageEnum';

export interface IAutoEvaluation {
  id: string;
  evaluation_user_id: string;
  project_employee_id: string;
  execution_effort: number;
  fatigue_feeling: number;
  warm_feeling: number;
  back_pain: number;
  shoulder_pain: number;
  arms_pain: number;
  legs_pain: number;
  thighs_pain: number;
  knees_pain: number;
  feet_pain: number;
  use_of_pain_medicine: number;
  observation: string;
  evaluation_type: EvaluationStageEnum;
  created_at: Date;
  updated_at: Date;
}

export interface IFormCreateAutoEvaluation {
  project_employee_id: string;
  execution_effort: number;
  fatigue_feeling: number;
  warm_feeling: number;
  back_pain: number;
  shoulder_pain: number;
  arms_pain: number;
  legs_pain: number;
  thighs_pain: number;
  knees_pain: number;
  feet_pain: number;
  use_of_pain_medicine: number;
  observation?: string | null;
  evaluation_type: EvaluationStageEnum;
}

export interface IFormUpdateAutoEvaluation {
  execution_effort: number;
  fatigue_feeling: number;
  warm_feeling: number;
  back_pain: number;
  shoulder_pain: number;
  arms_pain: number;
  legs_pain: number;
  thighs_pain: number;
  knees_pain: number;
  feet_pain: number;
  use_of_pain_medicine: number;
  observation?: string | null;
}
