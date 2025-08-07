import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@modules/auth/hooks/auth';

type EnsureFirstLoginRouteProps = {
  children: React.ReactNode;
  redirectTo: string;
};

/**
 * @description Garante que a rota não estará acessível para um usuário logado pela primeira vez
 * @param redirectTo Rota que o usuário será redirecionado caso esteja logado pela primeira vez
 */
const EnsureIsNotFirstLoginRoute: React.FC<EnsureFirstLoginRouteProps> = ({
  children,
  redirectTo,
}) => {
  const { user } = useAuth();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return user.is_first_login ? <Navigate to={redirectTo} /> : <>{children}</>;
};

export default EnsureIsNotFirstLoginRoute;
