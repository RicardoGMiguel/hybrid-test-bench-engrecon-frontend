import { IPainMap } from './IPainMap';

interface IGaugeChart {
  has_pain: number;
  pain_level: number;
}

interface IReport {
  gauge_chart: IGaugeChart;
  test_pain_chart: IPainMap;
  control_pain_chart: IPainMap;
}

export interface IKinesisEvaluationReport {
  current_evaluation: IReport;
  prev_evaluation?: IReport;
}
