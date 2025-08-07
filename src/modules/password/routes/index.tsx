import { Route } from 'react-router-dom';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';

import EnsureIsNotFirstLoginRoute from '@routes/privateRoutes/EnsureIsNotFirstLoginRoute';
import EnsureFirstLoginRoute from '@routes/privateRoutes/EnsureFirstLoginRoute';
import PasswordLayout from '../layout';
import ChangePasswordFirstLogin from '../pages/ChangePasswordFirstLogin';
import ChangePassword from '../pages/ChangePassword';

const PasswordRoutes = (
  <Route element={<PasswordLayout />}>
    <Route
      path={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
      element={
        <EnsureFirstLoginRoute redirectTo={PrivatePathsEnum.PROJECTS}>
          <ChangePasswordFirstLogin />
        </EnsureFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.CHANGE_PASSWORD}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <ChangePassword />
        </EnsureIsNotFirstLoginRoute>
      }
    />
  </Route>
);

export default PasswordRoutes;
