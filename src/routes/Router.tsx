import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import ErrorBoundary from '@errors/ErrorBoundary';
import { useAuth } from '@modules/auth/hooks/auth/index';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import {
  DefaultAdminPrivateRoutes,
  GlobalAdminPrivateRoutes,
  CustomerAdminPrivateRoutes,
  HealthPrivateRoutes,
  ViewerPrivateRoutes,
} from './privateRoutes/PrivateRoutes';
import PublicRoutes from './publicRoutes/PublicRoutes';

const defaultRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />} path="/">
      {DefaultAdminPrivateRoutes}
      {PublicRoutes}
    </Route>
  )
);

const globalAdminRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />} path="/">
      {GlobalAdminPrivateRoutes}
      {PublicRoutes}
    </Route>
  )
);

const customerAdminRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />} path="/">
      {CustomerAdminPrivateRoutes}
      {PublicRoutes}
    </Route>
  )
);

const healthRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />} path="/">
      {HealthPrivateRoutes}
      {PublicRoutes}
    </Route>
  )
);
const viewerRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />} path="/">
      {ViewerPrivateRoutes}
      {PublicRoutes}
    </Route>
  )
);

const Router: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === UserRolesEnum.GLOBAL_ADMIN) {
    return <RouterProvider router={globalAdminRouter} />;
  }

  if (user?.role === UserRolesEnum.CUSTOMER_ADMIN) {
    return <RouterProvider router={customerAdminRouter} />;
  }

  if (user?.role === UserRolesEnum.HEALTH) {
    return <RouterProvider router={healthRouter} />;
  }

  if (user?.role === UserRolesEnum.VIEWER) {
    return <RouterProvider router={viewerRouter} />;
  }
  return <RouterProvider router={defaultRouter} />;
};

export default Router;
