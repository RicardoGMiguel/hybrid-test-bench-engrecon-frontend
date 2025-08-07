import { EquipmentSizesEnum } from '../types/EquipmentSizesEnum';

export const TranslateEquipmentSizePT = (
  sizeLabel: EquipmentSizesEnum | string
) => {
  switch (sizeLabel) {
    case EquipmentSizesEnum.UNIQUE:
      return 'Único';
    case EquipmentSizesEnum.SMALL_MEDIUM:
      return 'P/M';
    case EquipmentSizesEnum.MEDIUM_LARGE:
      return 'M/G';
    default:
      return '';
  }
};
