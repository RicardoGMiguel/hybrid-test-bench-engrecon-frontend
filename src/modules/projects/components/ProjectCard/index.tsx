import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { format } from 'date-fns';
import {
  AccessButton,
  BottomInfoContainer,
  CompanyText,
  Container,
  Header,
  IconButton,
  InfoContainer,
  LabelText,
  ValueText,
} from './styles';

interface IProjectCardProps {
  name: string;
  customerName: string;
  customerAdminName: string;
  participantsNumber: number;
  expectedEnd: Date;
  status: string;
  onEditClick: () => void;
  onAccessClick: () => void;
  deleted: boolean;
}

const ProjectCard: React.FC<IProjectCardProps> = ({
  name,
  customerName,
  customerAdminName,
  participantsNumber,
  expectedEnd,
  status,
  onEditClick,
  onAccessClick,
  deleted,
}) => (
  <Container deleted={deleted}>
    <Header>
      <ValueText>{name}</ValueText>
      <IconButton onClick={onEditClick} deleted={deleted}>
        <FiSettings />
      </IconButton>
    </Header>
    <InfoContainer>
      <LabelText>Empresa</LabelText>
      <CompanyText>{customerName}</CompanyText>
    </InfoContainer>
    <InfoContainer>
      <LabelText>Responsável Principal</LabelText>
      <ValueText>{customerAdminName}</ValueText>
    </InfoContainer>
    <BottomInfoContainer>
      <InfoContainer>
        <LabelText>N° Participantes</LabelText>
        <ValueText>{participantsNumber}</ValueText>
      </InfoContainer>
      <InfoContainer>
        <LabelText>Encerramento</LabelText>
        <ValueText>{format(expectedEnd, 'dd/MM/yyyy')}</ValueText>
      </InfoContainer>
    </BottomInfoContainer>
    <BottomInfoContainer>
      <InfoContainer>
        <LabelText>Status</LabelText>
        <ValueText>{status}</ValueText>
      </InfoContainer>
      <AccessButton onClick={onAccessClick} deleted={deleted}>
        Acessar
      </AccessButton>
    </BottomInfoContainer>
  </Container>
);

export default ProjectCard;
