import { GenderEnum } from '../types/GenderEnum';

export const TranslateGenderToPT = (genderLabel: GenderEnum | string) => {
  switch (genderLabel) {
    case GenderEnum.FEMALE:
      return 'Feminino';
    case GenderEnum.MALE:
      return 'Masculino';
    default:
      return '';
  }
};
