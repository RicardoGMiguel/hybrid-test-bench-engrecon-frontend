import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Header';
import { Container } from './styles';

const CarlaLayout: React.FC = () => (
  <>
    <Header />
    <Container>
      <Outlet />
    </Container>
  </>
);

export default CarlaLayout;
