import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';

import { INavItemData } from '@components/Header/interfaces/INavItemData';

export const navItems = () =>
  [
    {
      route: PrivatePathsEnum.HOME,
      label: 'Acoplamento',
    },
    {
      route: PrivatePathsEnum.CYCLES,
      label: 'Ciclos',
    },
    {
      route: PrivatePathsEnum.USERS,
      label: 'Usuários',
    },
  ] as INavItemData[];
