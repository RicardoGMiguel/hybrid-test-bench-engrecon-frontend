import React from 'react';
import FrontPainMap from './assets/FrontPainMap.png';
import RearPainMap from './assets/RearPainMap.png';
import {
  Container,
  Title,
  Content,
  ImageContainer,
  PainMapImg,
  LabelContainer,
  Label,
  Value,
} from './styles';

interface PainMapProps {
  title: string;
  shoulderPain: number;
  armsPain: number;
  thighsPain: number;
  kneesPain: number;
  backPain: number;
  legsPain: number;
  feetPain: number;
}

const PainMap: React.FC<PainMapProps> = ({
  title,
  shoulderPain,
  armsPain,
  thighsPain,
  kneesPain,
  backPain,
  legsPain,
  feetPain,
}) => (
  <Container>
    <Title>{title}</Title>
    <Content>
      <ImageContainer>
        <PainMapImg src={FrontPainMap} />
        <LabelContainer posX={8} posY={5}>
          <Label>Ombros</Label>
          <Value value={shoulderPain}>{shoulderPain?.toFixed(1)}</Value>
        </LabelContainer>
        <LabelContainer posX={245} posY={48}>
          <Label>Braços</Label>
          <Value value={armsPain}>{armsPain?.toFixed(1)}</Value>
        </LabelContainer>
        <LabelContainer posX={210} posY={278}>
          <Label>Coxas</Label>
          <Value value={thighsPain}>{thighsPain?.toFixed(1)}</Value>
        </LabelContainer>
        <LabelContainer posX={36} posY={337}>
          <Label>Joelhos</Label>
          <Value value={kneesPain}>{kneesPain?.toFixed(1)}</Value>
        </LabelContainer>
      </ImageContainer>
      <ImageContainer>
        <PainMapImg src={RearPainMap} />
        <LabelContainer posX={200} posY={5}>
          <Label>Costas</Label>
          <Value value={backPain}>{backPain?.toFixed(1)}</Value>
        </LabelContainer>
        <LabelContainer posX={23} posY={322}>
          <Label>Pernas</Label>
          <Value value={legsPain}>{legsPain?.toFixed(1)}</Value>
        </LabelContainer>
        <LabelContainer posX={217} posY={400}>
          <Label>Pés</Label>
          <Value value={feetPain}>{feetPain?.toFixed(1)}</Value>
        </LabelContainer>
      </ImageContainer>
    </Content>
  </Container>
);

export default PainMap;
