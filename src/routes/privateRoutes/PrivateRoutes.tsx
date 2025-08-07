import { Route } from 'react-router-dom';

import PasswordRoutes from '@modules/password/routes';
import ProjectsRoutes from '@modules/projects/routes';
import EmployeesRoutes from '@modules/employees/routes';
import EquipmentsRoutes from '@modules/equipments/routes';
import CustomersRoutes from '@modules/customers/routes';
import UsersRoutes from '@modules/users/routes';
import TemplatesRoutes from '@modules/templates/routes';
import PrivateLayout from './layout';

export const DefaultAdminPrivateRoutes = (
  <Route element={<PrivateLayout />}>
    {PasswordRoutes}
    {EmployeesRoutes}
    {EquipmentsRoutes}
    {CustomersRoutes}
    {UsersRoutes}
    {ProjectsRoutes}
    {TemplatesRoutes}
  </Route>
);

export const GlobalAdminPrivateRoutes = (
  <Route element={<PrivateLayout />}>
    {EquipmentsRoutes}
    {EmployeesRoutes}
    {CustomersRoutes}
    {UsersRoutes}
    {ProjectsRoutes}
    {TemplatesRoutes}
  </Route>
);

export const CustomerAdminPrivateRoutes = (
  <Route element={<PrivateLayout />}>
    {PasswordRoutes}
    {EmployeesRoutes}
    {UsersRoutes}
    {ProjectsRoutes}
  </Route>
);

export const HealthPrivateRoutes = (
  <Route element={<PrivateLayout />}>
    {PasswordRoutes}
    {ProjectsRoutes}
    {EmployeesRoutes}
  </Route>
);

export const ViewerPrivateRoutes = (
  <Route element={<PrivateLayout />}>
    {PasswordRoutes}
    {ProjectsRoutes}
  </Route>
);
