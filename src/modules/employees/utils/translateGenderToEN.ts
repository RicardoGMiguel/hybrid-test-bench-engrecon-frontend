import { GenderEnum } from '../types/GenderEnum';

export const TranslateGenderToEN = (genderLabel: string) => {
  switch (genderLabel) {
    case 'Feminino':
      return GenderEnum.FEMALE;
    case 'Masculino':
      return GenderEnum.MALE;
    default:
      return GenderEnum.FEMALE;
  }
};
