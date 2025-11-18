import { CouplingModesEnum } from '../enums/couplingModes.enum';

export interface IFormSendCommand {
  cmd: string;
  mode: CouplingModesEnum;
  cardanInitialSpeed: string;
  cardanEndSpeed: string;
  cardanTestTotalTime: string;
  couplingInstant: string;
}
