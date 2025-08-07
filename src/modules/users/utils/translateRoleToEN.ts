import { UserRolesEnum } from '../types/UserRolesEnum';

export const TranslateRoleEN = (roleLabel: string) => {
  switch (roleLabel) {
    case 'Administrador Geral':
      return UserRolesEnum.GLOBAL_ADMIN;
    case 'Administrador':
      return UserRolesEnum.CUSTOMER_ADMIN;
    case 'Saúde':
      return UserRolesEnum.HEALTH;
    case 'Visualizador':
      return UserRolesEnum.VIEWER;
    default:
      return UserRolesEnum.VIEWER;
  }
};
