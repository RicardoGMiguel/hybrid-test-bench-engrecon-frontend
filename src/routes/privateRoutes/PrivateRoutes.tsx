import { Route } from 'react-router-dom';

import HomeRoutes from '@modules/home/routes';
import UsersRoutes from '@modules/users/routes';
import PrivateLayout from './layout';

const PrivateRoutes = (
  <Route element={<PrivateLayout />}>
    {HomeRoutes}
    {UsersRoutes}
  </Route>
);

export default PrivateRoutes;
