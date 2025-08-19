import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import CyclesLayout from '../layout';
import Cycles from '../pages/cycles';

const CyclesRoutes = (
  <Route element={<CyclesLayout />}>
    <Route path={PrivatePathsEnum.CYCLES} element={<Cycles />} />
  </Route>
);

export default CyclesRoutes;
