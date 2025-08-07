import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';

import { INavItemData } from '@components/Header/interfaces/INavItemData';

export const navItems = () =>
  [
    {
      route: PrivatePathsEnum.HOME,
      label: 'Home',
    },
    {
      route: PrivatePathsEnum.USERS,
      label: 'Usuários',
    },
  ] as INavItemData[];
