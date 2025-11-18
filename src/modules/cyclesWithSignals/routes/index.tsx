import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import CyclesLayout from '../layout';
import CyclesWithSignals from '../pages/cyclesWithSignals';

const CyclesWithSignalsRoutes = (
  <Route element={<CyclesLayout />}>
    <Route
      path={PrivatePathsEnum.CYCLES_WITH_SIGNALS}
      element={<CyclesWithSignals />}
    />
  </Route>
);

export default CyclesWithSignalsRoutes;
