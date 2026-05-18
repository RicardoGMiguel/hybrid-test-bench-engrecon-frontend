import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';

import { INavItemData } from '@components/Header/interfaces/INavItemData';

export const navItems = () =>
  [
    {
      route: PrivatePathsEnum.HOME,
      label: 'Coupling',
    },
    {
      route: PrivatePathsEnum.CYCLES,
      label: 'Cycles',
    },
    // {
    //   route: PrivatePathsEnum.CYCLES_WITH_SIGNALS,
    //   label: 'Ciclos com sinais',
    // },
    // {
    //   route: PrivatePathsEnum.CARLA,
    //   label: 'Carla Simulator',
    // },
    {
      route: PrivatePathsEnum.USERS,
      label: 'Users',
    },
  ] as INavItemData[];
