import { EquipmentTypesEnum } from '../types/EquipmentTypesEnum';

export const TranslateEquipmentTypeEN = (typeLabel: string) => {
  switch (typeLabel) {
    case 'Costas':
      return EquipmentTypesEnum.BACK;
    case 'Ombro':
      return EquipmentTypesEnum.SHOULDER;
    case 'Híbrido':
      return EquipmentTypesEnum.HYBRID;
    case 'Outro':
      return EquipmentTypesEnum.OTHER;
    default:
      return EquipmentTypesEnum.OTHER;
  }
};
