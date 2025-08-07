import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';

import EnsureIsNotFirstLoginRoute from '@routes/privateRoutes/EnsureIsNotFirstLoginRoute';
import CustomersLayout from '../layout';
import Customers from '../pages/Customers';
import CreateCustomers from '../pages/CreateCustomers';
import EditCustomer from '../pages/EditCustomer';

const CustomersRoutes = (
  <Route element={<CustomersLayout />}>
    <Route
      path={PrivatePathsEnum.CUSTOMERS}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <Customers />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.CREATE_CUSTOMERS}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <CreateCustomers />
        </EnsureIsNotFirstLoginRoute>
      }
    />

    <Route
      path={PrivatePathsEnum.UPDATE_CUSTOMER}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <EditCustomer />
        </EnsureIsNotFirstLoginRoute>
      }
    />
  </Route>
);

export default CustomersRoutes;
