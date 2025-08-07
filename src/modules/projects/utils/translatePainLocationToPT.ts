import { PainLocationsEnum } from '../components/StepContents/types/PainLocationsEnum';

export const TranslatePainLocationPT = (
  painLocationLabel: PainLocationsEnum | string
) => {
  switch (painLocationLabel) {
    case PainLocationsEnum.ARMS:
      return 'Braços';
    case PainLocationsEnum.BACK:
      return 'Costas';
    case PainLocationsEnum.FEET:
      return 'Pés';
    case PainLocationsEnum.KNEES:
      return 'Joelhos';
    case PainLocationsEnum.LEGS:
      return 'Pernas';
    case PainLocationsEnum.SHOULDER:
      return 'Ombros';
    case PainLocationsEnum.THIGHS:
      return 'Coxas';
    default:
      return '';
  }
};
