import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';

import { INavItemData } from '@components/Header/interfaces/INavItemData';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';

export const navItems = (userRole: UserRolesEnum | string) => {
  switch (userRole) {
    case UserRolesEnum.GLOBAL_ADMIN:
      return [
        {
          route: PrivatePathsEnum.PROJECTS,
          label: 'Projetos',
        },
        {
          route: PrivatePathsEnum.EMPLOYEES,
          label: 'Colaboradores',
        },
        {
          route: PrivatePathsEnum.EQUIPMENTS,
          label: 'Equipamentos',
        },
        {
          route: PrivatePathsEnum.CUSTOMERS,
          label: 'Empresas',
        },
        {
          route: PrivatePathsEnum.USERS,
          label: 'Usuários',
        },
        {
          route: PrivatePathsEnum.TEMPLATES,
          label: 'Templates',
        },
      ] as INavItemData[];
    case UserRolesEnum.CUSTOMER_ADMIN:
      return [
        {
          route: PrivatePathsEnum.PROJECTS,
          label: 'Projetos',
        },
        {
          route: PrivatePathsEnum.EMPLOYEES,
          label: 'Colaboradores',
        },
        {
          route: PrivatePathsEnum.USERS,
          label: 'Usuários',
        },
      ] as INavItemData[];
    case UserRolesEnum.HEALTH:
      return [
        {
          route: PrivatePathsEnum.PROJECTS,
          label: 'Projetos',
        },
        {
          route: PrivatePathsEnum.EMPLOYEES,
          label: 'Colaboradores',
        },
      ] as INavItemData[];
    default:
      return [
        {
          route: PrivatePathsEnum.PROJECTS,
          label: 'Projetos',
        },
      ] as INavItemData[];
  }
};
