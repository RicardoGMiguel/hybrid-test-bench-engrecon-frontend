import Title from '@components/Title';
import React, { useEffect, useState } from 'react';

import Button from '@components/Button';

import { CyclesEnum } from '@modules/cycles/enums/cycles.enum';

import { CycleCommandEnum } from '@modules/cycles/enums/cycleCommand.enum';
import CycleChart from '@modules/cycles/components/CycleChart';
import { ICycleChartProps } from '@modules/cycles/interfaces/ICycleChart';
import {
  Container,
  Content,
  Header,
  LeftContainer,
  RightContainer,
  InfoContainer,
  InfoTitle,
  CycleSelectionButtons,
  RadioButtonContainer,
  ButtonLabel,
  RadioButton,
  ButtonsContainer,
} from './styles';

const Cycles: React.FC = () => {
  useEffect(() => {
    document.title = 'Hybrid Test | Ciclos';
  }, []);

  const [selectedCycle, setSelectedCycle] = useState<CyclesEnum>(
    CyclesEnum.HFET
  );

  const [cycleCommand, setCycleCommand] = useState<CycleCommandEnum>(
    CycleCommandEnum.stop
  );

  const staticData: ICycleChartProps[] = [
    {
      id: 'Signal 1',
      color: 'hsl(240, 70%, 50%)',
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 2 },
        { x: 4, y: 4.9 },
        { x: 5, y: 8.1 },
        { x: 6, y: 11.3 },
        { x: 7, y: 14.5 },
        { x: 8, y: 17.3 },
      ],
    },
  ];

  return (
    <Container>
      <Header>
        <div>
          <Title value="Ciclo padrão" />
        </div>
      </Header>
      <Content>
        <LeftContainer>
          <div>
            <InfoContainer>
              <InfoTitle>Seleção do ciclo</InfoTitle>
              <CycleSelectionButtons>
                <RadioButtonContainer>
                  <ButtonLabel>HFET</ButtonLabel>
                  <RadioButton
                    onClick={() => setSelectedCycle(CyclesEnum.HFET)}
                    selected={!!(selectedCycle === CyclesEnum.HFET)}
                  >
                    <div />
                  </RadioButton>
                </RadioButtonContainer>
                <RadioButtonContainer>
                  <ButtonLabel>UDDS</ButtonLabel>
                  <RadioButton
                    onClick={() => setSelectedCycle(CyclesEnum.UDDS)}
                    selected={!!(selectedCycle === CyclesEnum.UDDS)}
                  >
                    <div />
                  </RadioButton>
                </RadioButtonContainer>
              </CycleSelectionButtons>
            </InfoContainer>
            <CycleChart chartData={staticData} />
            <ButtonsContainer>
              <Button
                label="Iniciar"
                size="lg"
                type="button"
                onClick={() => {
                  setCycleCommand(CycleCommandEnum.start);
                }}
                selected={!!(cycleCommand === CycleCommandEnum.start)}
              />
              <Button
                label="Cancelar"
                size="lg"
                type="button"
                onClick={() => {
                  setCycleCommand(CycleCommandEnum.stop);
                }}
                selected={!!(cycleCommand === CycleCommandEnum.stop)}
              />
            </ButtonsContainer>
            <ButtonsContainer>
              <Button label="Enviar comando" size="lg" type="submit" selected />
            </ButtonsContainer>
          </div>
        </LeftContainer>
        <RightContainer>
          <div />
        </RightContainer>
      </Content>
    </Container>
  );
};

export default Cycles;
