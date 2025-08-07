import { CustomerSizesEnum } from '../types/CustomerSizesEnum';

export const TranslateCustomerSizePT = (
  sizeLabel: CustomerSizesEnum | string
) => {
  switch (sizeLabel) {
    case CustomerSizesEnum.LARGE:
      return 'Grande';
    case CustomerSizesEnum.MEDIUM:
      return 'Médio';
    case CustomerSizesEnum.SMALL:
      return 'Pequeno';
    case CustomerSizesEnum.MICRO:
      return 'Micro';
    default:
      return '';
  }
};
