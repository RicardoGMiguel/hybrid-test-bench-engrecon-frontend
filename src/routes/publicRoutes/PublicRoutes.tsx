import { Route } from 'react-router-dom';

import AuthenticationRoutes from '@modules/auth/routes';
import PublicLayout from './layout';

const PublicRoutes = (
  <Route element={<PublicLayout />}>{AuthenticationRoutes}</Route>
);

export default PublicRoutes;
