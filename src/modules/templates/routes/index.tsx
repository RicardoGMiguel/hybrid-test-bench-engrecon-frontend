import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import EnsureIsNotFirstLoginRoute from '@routes/privateRoutes/EnsureIsNotFirstLoginRoute';
import TemplatesLayout from '../layout';
import Templates from '../pages/Templates';

const TemplatesRoutes = (
  <Route element={<TemplatesLayout />}>
    <Route
      path={PrivatePathsEnum.TEMPLATES}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <Templates />
        </EnsureIsNotFirstLoginRoute>
      }
    />
  </Route>
);

export default TemplatesRoutes;
