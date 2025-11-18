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
      route: PrivatePathsEnum.CYCLES_WITH_SIGNALS,
      label: 'Ciclos com sinais',
    },
    // {
    //   route: PrivatePathsEnum.CARLA,
    //   label: 'Carla Simulator',
    // },
    {
      route: PrivatePathsEnum.USERS,
      label: 'Usuários',
    },
  ] as INavItemData[];
