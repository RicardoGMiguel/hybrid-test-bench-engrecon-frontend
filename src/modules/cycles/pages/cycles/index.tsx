import Title from '@components/Title';
import React, { useEffect, useState, useCallback } from 'react';
import { useToast } from '@hooks/toast';
import { useCycle } from '@modules/cycles/hooks/index';
import Button from '@components/Button';

import { CyclesEnum } from '@modules/cycles/enums/cycles.enum';

import { CycleCommandEnum } from '@modules/cycles/enums/cycleCommand.enum';
import CycleChart from '@modules/cycles/components/CycleChart';
import { ICycle } from '@modules/cycles/interfaces/ICycle';
import MessageComponent from '@modules/home/components/MessageComponent';
import themeDefaults from '@style/themeDefaults';
import { IFormSendCycleCommand } from '@modules/cycles/interfaces/IFormSendCycleCommand';
import HybridImage from '../../images/paralel_hybrid.jpg';
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
  Info,
  InfoLabel,
  InfoText,
  CurrentStatusContainer,
  ImageContainer,
} from './styles';

const Cycles: React.FC = () => {
  useEffect(() => {
    document.title = 'Hybrid Test | Ciclos';
  }, []);

  const [selectedCycle, setSelectedCycle] = useState<CyclesEnum>(
    CyclesEnum.HFET
  );

  const [cycleCommand, setCycleCommand] = useState<CycleCommandEnum>(
    CycleCommandEnum.cycle_stop
  );
  const [lastCycleCommand, setLastCycleCommand] = useState<CycleCommandEnum>(
    CycleCommandEnum.cycle_stop
  );

  const [cycleData, setCycleData] = useState<ICycle[]>([]);

  const [lastRequestTime, setLastRequestTime] = useState(0);

  const { addToast } = useToast();
  const { SendCycleCommand } = useCycle();

  const readFile = useCallback(async (url: string) => {
    const response = await fetch(url);
    const text = await response.text();

    const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');

    const data: ICycle[] = lines.map((line, index) => {
      const [timeStr, speedStr] = line.trim().split(/\s+/);
      if (index === 0) {
        return {
          x: 0,
          y: 0,
        };
      }

      return {
        x: Number(timeStr),
        y: Number(speedStr) * 1.60934,
      };
    });

    return data;
  }, []);

  useEffect(() => {
    const newData = readFile(`/staticData/${selectedCycle}.txt`);

    newData.then((result) => setCycleData(result));
  }, [readFile, selectedCycle]);

  const onSubmit = useCallback(async () => {
    const now = Date.now();
    const delay = 2000; // 2 segundos de delay entre requisições

    // Se ainda não passou tempo suficiente desde a última requisição
    if (now - lastRequestTime < delay) {
      addToast({
        title: 'Aguarde',
        description: `Por favor, espere ${
          delay / 1000
        } segundos entre os comandos`,
        type: 'warning',
      });
      return;
    }

    const dataToSend: IFormSendCycleCommand = {
      cmd: cycleCommand,
      cycle: selectedCycle,
    };

    setLastRequestTime(now);
    SendCycleCommand(dataToSend);

    setLastCycleCommand(cycleCommand);

    if (cycleCommand === CycleCommandEnum.cycle_start) {
      const ws = new WebSocket('ws://localhost:8080');

      ws.onmessage = (event) => {
        const newComingData = JSON.parse(event.data);

        console.log(newComingData);
      };
    } else {
      console.log({
        message: '-',
        state: {
          cardanSpeed: '-',
          motorSpeed: '-',
          delay: '-',
          stepperMotorState: '-',
        },
        chart: [],
      });
    }
  }, [
    SendCycleCommand,
    addToast,
    cycleCommand,
    lastRequestTime,
    selectedCycle,
  ]);

  return (
    <Container>
      <Header>
        <div>
          <Title value="Simulação de ciclo padrão" />
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
            <CycleChart chartData={cycleData} />
            <ButtonsContainer>
              <Button
                label="Iniciar"
                size="lg"
                type="button"
                onClick={() => {
                  setCycleCommand(CycleCommandEnum.cycle_start);
                }}
                selected={!!(cycleCommand === CycleCommandEnum.cycle_start)}
              />
              <Button
                label="Cancelar"
                size="lg"
                type="button"
                onClick={() => {
                  setCycleCommand(CycleCommandEnum.cycle_stop);
                }}
                selected={!!(cycleCommand === CycleCommandEnum.cycle_stop)}
              />
            </ButtonsContainer>
            <ButtonsContainer>
              <Button
                label="Enviar comando"
                size="lg"
                type="button"
                selected
                onClick={() => onSubmit()}
                disabled={!!(lastCycleCommand === cycleCommand)}
              />
            </ButtonsContainer>
          </div>
        </LeftContainer>
        <RightContainer>
          <div>
            <CurrentStatusContainer>
              <InfoContainer>
                <InfoTitle>Status do ciclo</InfoTitle>
                <MessageComponent message="Teste" />
                <Info>
                  <InfoLabel>Velocidade do veículo</InfoLabel>
                  <InfoText>45 km/h</InfoText>
                </Info>
                <Info>
                  <InfoLabel>Rotação do cardan:</InfoLabel>
                  <InfoText>1200 rpm</InfoText>
                </Info>
                <Info>
                  <InfoLabel>Tempo</InfoLabel>
                  <InfoText>2 s</InfoText>
                </Info>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Condição atual</InfoTitle>

                <Info>
                  <InfoLabel>Motor elétrico:</InfoLabel>
                  <InfoText color={themeDefaults.colors.greenButtonColor}>
                    Ativado
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Rotação do motor elétrico:</InfoLabel>
                  <InfoText>1200 rpm</InfoText>
                </Info>

                <Info>
                  <InfoLabel>Regeneração:</InfoLabel>
                  <InfoText color={themeDefaults.colors.greenButtonColor}>
                    Ativada
                  </InfoText>
                </Info>
              </InfoContainer>
            </CurrentStatusContainer>
            <ImageContainer>
              <img src={HybridImage} alt="Hybrid" />
            </ImageContainer>
          </div>
        </RightContainer>
      </Content>
    </Container>
  );
};

export default Cycles;
