import React from 'react';
import { Container, Label } from './styles';

interface TitleProps {
  value: string;
}

const Title: React.FC<TitleProps> = ({ value }) => (
  <Container>
    <Label>{value}</Label>
  </Container>
);

export default Title;
