import React from 'react';
import { Container, LeftStripe, Content, Value, Label } from './styles';

interface ValueCardProps {
  value: number;
  label: string;
  color?: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ value, label, color }) => (
  <Container>
    <LeftStripe color={color} />
    <Content>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Content>
  </Container>
);

export default ValueCard;
