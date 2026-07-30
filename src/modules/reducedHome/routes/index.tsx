import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import HomeLayout from '../layout';
import ReducedHome from '../pages/reducedHome';

const ReducedHomeRoutes = (
  <Route element={<HomeLayout />}>
    <Route path={PrivatePathsEnum.REDUCED_HOME} element={<ReducedHome />} />
  </Route>
);

export default ReducedHomeRoutes;
