import { ProjectStatusEnum } from '../types/ProjectStatusEnum';

export const TranslateProjectStatusToPT = (
  projectStatusLabel: ProjectStatusEnum | string
) => {
  switch (projectStatusLabel) {
    case ProjectStatusEnum.IN_PROGRES:
      return 'Em andamento';
    case ProjectStatusEnum.DONE:
      return 'Concluído';
    default:
      return 'Em andamento';
  }
};
