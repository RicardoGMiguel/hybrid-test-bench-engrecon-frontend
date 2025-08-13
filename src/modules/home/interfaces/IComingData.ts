import { StepperMotorStateEnum } from '../enums/stepperMotorStates.enum';
import { IOscilloscopeProps } from './IOscilloscopeProps';

interface IState {
  cardanSpeed: number | string;
  motorSpeed: number | string;
  delay: number | string;
  stepperMotorState: StepperMotorStateEnum;
}

export interface IComingData {
  message: string;
  state: IState;
  chart: IOscilloscopeProps[];
}
