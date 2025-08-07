import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@modules/auth/hooks/auth';

type EnsureLoggedOutRouteProps = {
  children: React.ReactNode;
  redirectTo: string;
};

/**
 * @description Garante que a rota não estará acessível para um usuário logado
 * @param redirectTo Rota que o usuário será redirecionado caso esteja logado
 */
const EnsureLoggedOutRoute: React.FC<EnsureLoggedOutRouteProps> = ({
  children,
  redirectTo,
}) => {
  const { user } = useAuth();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return user ? <Navigate to={redirectTo} /> : <>{children}</>;
};

export default EnsureLoggedOutRoute;
