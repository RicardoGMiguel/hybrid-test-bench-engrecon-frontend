import { CouplingModesEnum } from '../enums/couplingModes.enum';

export interface IFormSendCommand {
  cmd: string;
  mode?: CouplingModesEnum | string;
  cardanInitialSpeed: string;
  cardanEndSpeed: string;
  cardanTestTotalTime: string;
  couplingInstant: string;
}
