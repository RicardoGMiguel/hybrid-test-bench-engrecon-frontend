import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import HomeLayout from '../layout';
import Home from '../pages/home';

const HomeRoutes = (
  <Route element={<HomeLayout />}>
    <Route path={PrivatePathsEnum.HOME} element={<Home />} />
  </Route>
);

export default HomeRoutes;
