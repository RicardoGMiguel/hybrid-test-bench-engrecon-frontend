import { PainLocationsEnum } from '../components/StepContents/types/PainLocationsEnum';

export const TranslatePainLocationEN = (painLocationLabel: string) => {
  switch (painLocationLabel) {
    case 'Braços':
      return PainLocationsEnum.ARMS;
    case 'Costas':
      return PainLocationsEnum.BACK;
    case 'Pés':
      return PainLocationsEnum.FEET;
    case 'Joelhos':
      return PainLocationsEnum.KNEES;
    case 'Pernas':
      return PainLocationsEnum.LEGS;
    case 'Ombros':
      return PainLocationsEnum.SHOULDER;
    case 'Coxas':
      return PainLocationsEnum.THIGHS;
    default:
      return PainLocationsEnum.ARMS;
  }
};
