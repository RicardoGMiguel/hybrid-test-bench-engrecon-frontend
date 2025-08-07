import React from 'react';

import { Outlet } from 'react-router-dom';
import { Container } from './styles';

const PublicLayout: React.FC = () => (
  <Container>
    <Outlet />
  </Container>
);

export default PublicLayout;
