import React, { useMemo } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import { Container, Label } from './styles';

interface INavItemProps {
  route: string;
  label: string;
}

const NavItem: React.FC<INavItemProps> = ({ route, label }) => {
  const { pathname } = useLocation();

  const pathMatch = useMatch(pathname);

  const isCurrentRoute = useMemo(
    () => pathMatch?.pathnameBase?.split('/')[1] === route?.split('/')[1],
    [pathMatch, route]
  );

  return (
    <Container to={route}>
      <Label $isCurrentRoute={isCurrentRoute}>{label}</Label>
    </Container>
  );
};

export default NavItem;
