import React from 'react';
import FrontFinalPainMap from './assets/FrontFinalPainMap.png';
import RearFinalPainMap from './assets/RearFinalPainMap.png';
import Comparison from './Comparison';
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

export interface IPainValues {
  shoulderPain?: number;
  armsPain?: number;
  thighsPain?: number;
  kneesPain?: number;
  backPain?: number;
  legsPain?: number;
  feetPain?: number;
}

interface PainMapProps {
  title: string;
  currentPainValues: IPainValues;
  prevPainValues: IPainValues;
}

const PainMap: React.FC<PainMapProps> = ({
  title,
  currentPainValues,
  prevPainValues,
}) => (
  <Container>
    <Title>{title}</Title>
    <Content>
      <ImageContainer>
        <PainMapImg src={FrontFinalPainMap} />
        <LabelContainer posX={-3} posY={22}>
          <Label>Ombros:</Label>
          <Value value={currentPainValues.shoulderPain || 0}>
            {currentPainValues.shoulderPain !== undefined
              ? currentPainValues.shoulderPain.toFixed(1)
              : '---'}
          </Value>
        </LabelContainer>

        <Comparison
          value={currentPainValues.shoulderPain || 0}
          prevResultValue={prevPainValues.shoulderPain}
          posX={-15}
          posY={65}
        />
        <LabelContainer posX={310} posY={66}>
          <Label>Braços:</Label>
          <Value value={currentPainValues.armsPain || 0}>
            {currentPainValues.armsPain !== undefined
              ? currentPainValues.armsPain.toFixed(1)
              : '---'}
          </Value>
        </LabelContainer>
        <Comparison
          value={currentPainValues.armsPain || 0}
          prevResultValue={prevPainValues.armsPain}
          posX={310}
          posY={107}
        />
        <LabelContainer posX={270} posY={295}>
          <Label>Coxas:</Label>
          <Value value={currentPainValues.thighsPain || 0}>
            {currentPainValues.thighsPain !== undefined
              ? currentPainValues.thighsPain.toFixed(1)
              : '---'}
          </Value>
        </LabelContainer>
        <Comparison
          value={currentPainValues.thighsPain || 0}
          prevResultValue={prevPainValues.thighsPain}
          posX={270}
          posY={336}
        />
        <LabelContainer posX={26} posY={354}>
          <Label>Joelhos:</Label>
          <Value value={currentPainValues.kneesPain || 0}>
            {currentPainValues.kneesPain !== undefined
              ? currentPainValues.kneesPain.toFixed(1)
              : '---'}
          </Value>
        </LabelContainer>
        <Comparison
          value={currentPainValues.kneesPain || 0}
          prevResultValue={prevPainValues.kneesPain}
          posX={14}
          posY={395}
        />
      </ImageContainer>
      <ImageContainer>
        <PainMapImg src={RearFinalPainMap} />
        <LabelContainer posX={252} posY={22}>
          <Label>Costas:</Label>
          <Value value={currentPainValues.backPain || 0}>
            {currentPainValues.backPain !== undefined
              ? currentPainValues.backPain.toFixed(1)
              : '---'}
          </Value>
        </LabelContainer>
        <Comparison
          value={currentPainValues.backPain || 0}
          prevResultValue={prevPainValues.backPain}
          posX={252}
          posY={62}
        />
        <LabelContainer posX={-4} posY={338}>
          <Label>Pernas:</Label>
          <Value value={currentPainValues.legsPain || 0}>
            {currentPainValues.legsPain !== undefined
              ? currentPainValues.legsPain.toFixed(1)
              : '---'}
          </Value>
        </LabelContainer>
        <Comparison
          value={currentPainValues.legsPain || 0}
          prevResultValue={prevPainValues.legsPain}
          posX={-4}
          posY={378}
        />
        <LabelContainer posX={268} posY={417}>
          <Label>Pés:</Label>
          <Value value={currentPainValues.feetPain || 0}>
            {currentPainValues.feetPain !== undefined
              ? currentPainValues.feetPain.toFixed(1)
              : '---'}
          </Value>
        </LabelContainer>
        <Comparison
          value={currentPainValues.feetPain || 0}
          prevResultValue={prevPainValues.feetPain}
          posX={268}
          posY={456}
        />
      </ImageContainer>
    </Content>
  </Container>
);

export default PainMap;
