export interface IOsciChartData {
  x: number;
  y: number;
}

export interface IOscilloscopeProps {
  id: string;
  color: string;
  data: IOsciChartData[];
}
