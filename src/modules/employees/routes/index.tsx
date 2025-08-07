import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import EnsureIsNotFirstLoginRoute from '@routes/privateRoutes/EnsureIsNotFirstLoginRoute';
import EmployeesLayout from '../layout';
import Employees from '../pages/Employees';
import CreateEmployees from '../pages/CreateEmployees';
import EditEmployee from '../pages/EditEmployee';

const EmployeesRoutes = (
  <Route element={<EmployeesLayout />}>
    <Route
      path={PrivatePathsEnum.EMPLOYEES}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <Employees />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.CREATE_EMPLOYEES}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <CreateEmployees />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.UPDATE_EMPLOYEE}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <EditEmployee />
        </EnsureIsNotFirstLoginRoute>
      }
    />
  </Route>
);

export default EmployeesRoutes;
