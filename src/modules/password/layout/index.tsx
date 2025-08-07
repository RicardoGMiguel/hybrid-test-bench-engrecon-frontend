import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from './styles';

const PasswordLayout: React.FC = () => (
  <Container>
    <Outlet />
  </Container>
);

export default PasswordLayout;
