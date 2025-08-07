import React from 'react';
import { Container } from './styles';

interface IEmptyListMessage {
  message: string;
  fontSize?: number;
}

const EmptyListMessage: React.FC<IEmptyListMessage> = ({
  message,
  fontSize,
}) => (
  <Container fontSize={fontSize}>
    <p>{message}</p>
  </Container>
);

export default EmptyListMessage;
