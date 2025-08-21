export interface ICycleChartData {
  x: number;
  y: number;
}

export interface ICycleChartProps {
  id: string;
  color: string;
  data: ICycleChartData[];
}
