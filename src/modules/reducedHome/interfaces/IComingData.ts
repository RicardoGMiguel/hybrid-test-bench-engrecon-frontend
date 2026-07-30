import { IOscilloscopeProps } from './IOscilloscopeProps';

interface IState {
  cardanSpeed: number | string;
  motorSpeed: number | string;
  delay?: number | string;
  actuatorState?: boolean | string;
  motorState?: boolean | string;
  regenerationState?: boolean | string;
  vehicleSpeed?: number | string;
  vehicleAcceleration?: number | string;
  totalTime?: number | string;
}

export interface IComingData {
  message: string;
  state: IState;
  chart: IOscilloscopeProps[];
}
