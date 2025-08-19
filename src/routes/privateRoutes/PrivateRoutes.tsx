import { Route } from 'react-router-dom';

import HomeRoutes from '@modules/home/routes';
import CyclesRoutes from '@modules/cycles/routes';
import UsersRoutes from '@modules/users/routes';
import PrivateLayout from './layout';

const PrivateRoutes = (
  <Route element={<PrivateLayout />}>
    {HomeRoutes}
    {CyclesRoutes}
    {UsersRoutes}
  </Route>
);

export default PrivateRoutes;
