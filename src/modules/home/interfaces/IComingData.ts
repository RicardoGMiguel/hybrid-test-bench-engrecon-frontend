import { OnOffStateEnum } from '../enums/onOffStates.enum';
import { IOscilloscopeProps } from './IOscilloscopeProps';

interface IState {
  cardanSpeed: number | string;
  motorSpeed: number | string;
  delay?: number | string;
  stepperMotorState?: OnOffStateEnum | string;
  motorState?: OnOffStateEnum | string;
  regenerationState?: OnOffStateEnum | string;
  vehicleSpeed?: number | string;
  vehicleAcceleration?: number | string;
  totalTime?: number | string;
}

export interface IComingData {
  message: string;
  state: IState;
  chart: IOscilloscopeProps[];
}
