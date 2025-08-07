import React from 'react';
import { Container, Label, ButtonGap } from './styles';
import { IList } from '../interfaces/IList';

interface ListHeaderProps {
  headerList: IList[];
  actionsGapWidth: number;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  headerList,
  actionsGapWidth,
}) => (
  <Container>
    {headerList.map((item) => (
      <Label key={item.label}>{item.label}</Label>
    ))}

    <ButtonGap minWidth={actionsGapWidth} />
  </Container>
);

export default ListHeader;
