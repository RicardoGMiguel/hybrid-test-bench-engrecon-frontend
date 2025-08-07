import { UserRolesEnum } from '../types/UserRolesEnum';

export const TranslateRolePT = (roleLabel: UserRolesEnum | string) => {
  switch (roleLabel) {
    case UserRolesEnum.GLOBAL_ADMIN:
      return 'Administrador Geral';
    case UserRolesEnum.CUSTOMER_ADMIN:
      return 'Administrador';
    case UserRolesEnum.HEALTH:
      return 'Saúde';
    case UserRolesEnum.VIEWER:
      return 'Visualizador';
    default:
      return '';
  }
};
