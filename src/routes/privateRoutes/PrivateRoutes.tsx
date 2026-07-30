import { Route } from 'react-router-dom';

import HomeRoutes from '@modules/home/routes';
import ReducedHomeRoutes from '@modules/reducedHome/routes';
import CyclesRoutes from '@modules/cycles/routes';
import ReducedCyclesRoutes from '@modules/reducedCycles/routes';
import CyclesWithSignalsRoutes from '@modules/cyclesWithSignals/routes';
import CarlaRoutes from '@modules/carla/routes';
import UsersRoutes from '@modules/users/routes';
import PrivateLayout from './layout';

const PrivateRoutes = (
  <Route element={<PrivateLayout />}>
    {HomeRoutes}
    {ReducedHomeRoutes}
    {CyclesRoutes}
    {ReducedCyclesRoutes}
    {CyclesWithSignalsRoutes}
    {CarlaRoutes}
    {UsersRoutes}
  </Route>
);

export default PrivateRoutes;
