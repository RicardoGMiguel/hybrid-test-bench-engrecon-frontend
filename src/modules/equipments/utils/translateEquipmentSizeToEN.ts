import { EquipmentSizesEnum } from '../types/EquipmentSizesEnum';

export const TranslateEquipmentSizeEN = (sizeLabel: string) => {
  switch (sizeLabel) {
    case 'Único':
      return EquipmentSizesEnum.UNIQUE;
    case 'P/M':
      return EquipmentSizesEnum.SMALL_MEDIUM;
    case 'M/G':
      return EquipmentSizesEnum.MEDIUM_LARGE;
    default:
      return EquipmentSizesEnum.UNIQUE;
  }
};
