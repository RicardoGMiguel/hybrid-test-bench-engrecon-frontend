import React from 'react';

import { Container, Description, Title } from './styles';

interface IToastMessageProps {
  title: string;
  description?: string;
}

const ToastMessage: React.FC<IToastMessageProps> = ({ title, description }) => (
  <Container>
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
  </Container>
);

export default ToastMessage;
