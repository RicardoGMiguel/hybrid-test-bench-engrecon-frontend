import { CouplingModesEnum } from '../enums/couplingModes.enum';

export interface IFormSendCommand {
  cmd: string;
  mode: CouplingModesEnum;
  cardanSpeed: string;
  rampTime: string;
}
