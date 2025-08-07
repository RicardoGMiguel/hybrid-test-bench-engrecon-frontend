import { EquipmentTypesEnum } from '../types/EquipmentTypesEnum';

export const TranslateEquipmentTypePT = (
  typeLabel: EquipmentTypesEnum | string
) => {
  switch (typeLabel) {
    case EquipmentTypesEnum.BACK:
      return 'Costas';
    case EquipmentTypesEnum.SHOULDER:
      return 'Ombro';
    case EquipmentTypesEnum.HYBRID:
      return 'Híbrido';
    case EquipmentTypesEnum.OTHER:
      return 'Outro';
    default:
      return '';
  }
};
