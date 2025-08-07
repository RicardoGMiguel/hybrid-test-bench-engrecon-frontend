import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import ErrorBoundary from '@errors/ErrorBoundary';
import PrivateRoutes from './privateRoutes/PrivateRoutes';
import PublicRoutes from './publicRoutes/PublicRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />} path="/">
      {PrivateRoutes}
      {PublicRoutes}
    </Route>
  )
);

const Router: React.FC = () => <RouterProvider router={router} />;

export default Router;
