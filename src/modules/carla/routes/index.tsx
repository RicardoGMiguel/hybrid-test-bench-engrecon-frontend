import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import CarlaLayout from '../layout';
import Carla from '../pages/carla';

const CarlaRoutes = (
  <Route element={<CarlaLayout />}>
    <Route path={PrivatePathsEnum.CARLA} element={<Carla />} />
  </Route>
);

export default CarlaRoutes;
