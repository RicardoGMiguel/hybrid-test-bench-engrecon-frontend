import React from 'react';

import { Container } from './styles';
import PrivateRoute from '../PrivateRoute';

const PrivateLayout: React.FC = () => (
  <Container>
    <PrivateRoute />
  </Container>
);

export default PrivateLayout;
