import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import UsersLayout from '../layout';
import Home from '../pages/home';

const UsersRoutes = (
  <Route element={<UsersLayout />}>
    <Route path={PrivatePathsEnum.HOME} element={<Home />} />
  </Route>
);

export default UsersRoutes;
