import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Header';
import { Container } from './styles';

const CustomersLayout: React.FC = () => (
  <>
    <Header />
    <Container>
      <Outlet />
    </Container>
  </>
);

export default CustomersLayout;
