import React from 'react';
import { IList } from '@components/List/interfaces/IList';
import { Container, Content, Label } from './styles';

interface EmployeeListProps {
  list: IList[];
}

const EmployeeListItem: React.FC<EmployeeListProps> = ({ list }) => (
  <Container>
    <Content>
      {list.map((item) => (
        <Label key={item.label}>{item.label}</Label>
      ))}
    </Content>
  </Container>
);

export default EmployeeListItem;
