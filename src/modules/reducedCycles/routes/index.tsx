import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import CyclesLayout from '../layout';
import ReducedCycles from '../pages/reducedCycles';

const ReducedCyclesRoutes = (
  <Route element={<CyclesLayout />}>
    <Route path={PrivatePathsEnum.REDUCED_CYCLES} element={<ReducedCycles />} />
  </Route>
);

export default ReducedCyclesRoutes;
