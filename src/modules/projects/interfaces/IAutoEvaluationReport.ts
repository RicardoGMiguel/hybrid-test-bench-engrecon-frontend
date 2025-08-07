import { IPainMap } from './IPainMap';

interface IGaugeChart {
  execution_effort: number;
  warm_feeling: number;
  fatigue_feeling: number;
  use_of_pain_medicine: number;
}

interface IReport {
  gauge_chart: IGaugeChart;
  test_pain_chart: IPainMap;
  control_pain_chart: IPainMap;
}

export interface IAutoEvaluationReport {
  current_evaluation: IReport;
  prev_evaluation?: IReport;
}
