import Title from '@components/Title';
import React, { useEffect, useState, useCallback } from 'react';

import { useCycle } from '@modules/cycles/hooks/index';
import Button from '@components/Button';

import { CyclesEnum } from '@modules/cycles/enums/cycles.enum';

import { CycleCommandEnum } from '@modules/cycles/enums/cycleCommand.enum';
import CycleChart from '@modules/cycles/components/CycleChart';
import { ICycle } from '@modules/cycles/interfaces/ICycle';
import MessageComponent from '@modules/home/components/MessageComponent';
import themeDefaults from '@style/themeDefaults';
import { IFormSendCycleCommand } from '@modules/cycles/interfaces/IFormSendCycleCommand';
import { IComingData } from '@modules/home/interfaces/IComingData';
import { OnOffStateEnum } from '@modules/home/enums/onOffStates.enum';
import HybridImage from '../../images/paralel_hybrid.jpg';
import RedArrowImg from '../../images/red_arrow.png';
import BlueArrowImg from '../../images/blue_arrow.png';
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
  RedArrow,
  BlueArrow,
  VehicleImg,
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

  const [ws, setWs] = useState<WebSocket | null>(null);

  const [cycleData, setCycleData] = useState<ICycle[]>([]);

  const [comingData, setComingData] = useState<IComingData>({
    message: '-',
    state: {
      cardanSpeed: '-',
      motorSpeed: '-',
      motorState: '-',
      regenerationState: '-',
      vehicleSpeed: '-',
      vehicleAcceleration: '-',
      totalTime: '-',
    },
    chart: [],
  });

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
    const dataToSend: IFormSendCycleCommand = {
      cmd: cycleCommand,
      cycle: selectedCycle,
    };

    SendCycleCommand(dataToSend);

    setLastCycleCommand(cycleCommand);

    if (cycleCommand === CycleCommandEnum.cycle_start) {
      const socket = new WebSocket('ws://localhost:8080');

      socket.onmessage = (event) => {
        const newComingData: IComingData = JSON.parse(event.data);

        setComingData(newComingData);
      };

      setWs(socket);
    }

    if (cycleCommand === CycleCommandEnum.cycle_stop) {
      if (ws) {
        ws.close();
        setWs(null);
      }

      setComingData({
        message: '-',
        state: {
          cardanSpeed: '-',
          motorSpeed: '-',
          motorState: '-',
          regenerationState: '-',
          vehicleSpeed: '-',
          vehicleAcceleration: '-',
          totalTime: '-',
        },
        chart: [],
      });
    }
  }, [SendCycleCommand, cycleCommand, selectedCycle, ws]);

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
                    onClick={() => {
                      if (lastCycleCommand === CycleCommandEnum.cycle_stop) {
                        setSelectedCycle(CyclesEnum.HFET);
                      }
                    }}
                    selected={!!(selectedCycle === CyclesEnum.HFET)}
                    disabled={
                      !!(lastCycleCommand === CycleCommandEnum.cycle_start)
                    }
                  >
                    <div />
                  </RadioButton>
                </RadioButtonContainer>
                <RadioButtonContainer>
                  <ButtonLabel>UDDS</ButtonLabel>
                  <RadioButton
                    onClick={() => {
                      if (lastCycleCommand === CycleCommandEnum.cycle_stop) {
                        setSelectedCycle(CyclesEnum.UDDS);
                      }
                    }}
                    selected={!!(selectedCycle === CyclesEnum.UDDS)}
                    disabled={
                      !!(lastCycleCommand === CycleCommandEnum.cycle_start)
                    }
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

                <Info>
                  <InfoLabel>Velocidade do veículo</InfoLabel>
                  <InfoText>
                    {comingData?.state.vehicleSpeed || '-'} km/h
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Aceleração do veículo</InfoLabel>
                  <InfoText>
                    {comingData?.state.vehicleAcceleration || '-'} m/s²
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Rotação do cardan:</InfoLabel>
                  <InfoText>
                    {comingData?.state.cardanSpeed || '-'} rpm
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Tempo total</InfoLabel>
                  <InfoText>{comingData?.state.totalTime || '-'} s</InfoText>
                </Info>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Condição atual</InfoTitle>
                <MessageComponent message={comingData?.message || '-'} />
                <Info>
                  <InfoLabel>Motor elétrico:</InfoLabel>
                  <InfoText
                    color={
                      comingData.state?.motorState === OnOffStateEnum.ON
                        ? themeDefaults.colors.greenButtonColor
                        : themeDefaults.colors.danger
                    }
                  >
                    {comingData.state?.motorState === OnOffStateEnum.ON
                      ? 'Ativado'
                      : 'Desativado'}
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Rotação do motor elétrico:</InfoLabel>
                  <InfoText>{comingData?.state.motorSpeed || '-'} rpm</InfoText>
                </Info>

                <Info>
                  <InfoLabel>Regeneração:</InfoLabel>
                  <InfoText
                    color={
                      comingData.state?.regenerationState === OnOffStateEnum.ON
                        ? themeDefaults.colors.greenButtonColor
                        : themeDefaults.colors.danger
                    }
                  >
                    {comingData.state?.regenerationState === OnOffStateEnum.ON
                      ? 'Ativada'
                      : 'Desativada'}
                  </InfoText>
                </Info>
              </InfoContainer>
            </CurrentStatusContainer>
            <ImageContainer>
              <VehicleImg src={HybridImage} alt="Hybrid" />
              <RedArrow
                src={RedArrowImg}
                alt="redArrow"
                visible={!!(comingData?.state.motorState === OnOffStateEnum.ON)}
              />
              <BlueArrow
                src={BlueArrowImg}
                alt="blueArrow"
                visible={
                  !!(comingData?.state.regenerationState === OnOffStateEnum.ON)
                }
              />
            </ImageContainer>
          </div>
        </RightContainer>
      </Content>
    </Container>
  );
};

export default Cycles;
