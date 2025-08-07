import { CustomerSizesEnum } from '../types/CustomerSizesEnum';

export const TranslateCustomerSizeEN = (sizeLabel: string) => {
  switch (sizeLabel) {
    case 'Grande':
      return CustomerSizesEnum.LARGE;
    case 'Médio':
      return CustomerSizesEnum.MEDIUM;
    case 'Pequeno':
      return CustomerSizesEnum.SMALL;
    case 'Micro':
      return CustomerSizesEnum.MICRO;
    default:
      return CustomerSizesEnum.MEDIUM;
  }
};
