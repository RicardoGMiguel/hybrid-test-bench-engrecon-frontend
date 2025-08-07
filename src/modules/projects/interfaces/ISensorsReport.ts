import { ISensorChart } from './ISensorChart';

interface ISensorEvaluation {
  test_sensor: ISensorChart;
  control_sensor: ISensorChart;
}

export interface ISensorsReport {
  current_evaluation: ISensorEvaluation;
  prev_evaluation?: ISensorEvaluation;
}
