import { CyclesEnum } from '../enums/cycles.enum';

export interface IFormSendCycleCommand {
  cmd: string;
  cycle: CyclesEnum;
}
