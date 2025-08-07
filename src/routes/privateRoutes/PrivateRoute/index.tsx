import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@modules/auth/hooks/auth';

import { PublicPathsEnum } from '../../publicRoutes/publicPaths';

const PrivateRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Awaits user validation before rendering content
  if (isLoading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to={PublicPathsEnum.LOGIN} replace />;
};

export default PrivateRoute;
