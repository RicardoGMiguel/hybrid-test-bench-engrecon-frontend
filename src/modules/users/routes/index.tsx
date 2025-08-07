import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import EnsureIsNotFirstLoginRoute from '@routes/privateRoutes/EnsureIsNotFirstLoginRoute';
import UsersLayout from '../layout';
import Users from '../pages/Users';
import CreateUsers from '../pages/CreateUsers';
import EditUser from '../pages/EditUser';

const UsersRoutes = (
  <Route element={<UsersLayout />}>
    <Route
      path={PrivatePathsEnum.USERS}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <Users />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.CREATE_USERS}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <CreateUsers />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.UPDATE_USER}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <EditUser />
        </EnsureIsNotFirstLoginRoute>
      }
    />
  </Route>
);

export default UsersRoutes;
