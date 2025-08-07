import { Route } from 'react-router-dom';

import { PublicPathsEnum } from '@routes/publicRoutes/publicPaths';
import EnsureLoggedOutRoute from '@routes/publicRoutes/EnsureLoggedOutRoute';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';

import AuthenticationLayout from '../layout';
import Login from '../pages/Login';

const AuthenticationRoutes = (
  <Route element={<AuthenticationLayout />}>
    <Route
      path={PublicPathsEnum.LOGIN}
      element={
        <EnsureLoggedOutRoute redirectTo={PrivatePathsEnum.HOME}>
          <Login />
        </EnsureLoggedOutRoute>
      }
    />
  </Route>
);

export default AuthenticationRoutes;
