import React from 'react';
import { Container } from './styles';

interface MessageProps {
  message: string;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => (
  <Container>
    <div>
      <h1>{message}</h1>
    </div>
  </Container>
);

export default MessageComponent;
