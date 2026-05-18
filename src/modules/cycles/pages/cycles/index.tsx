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

  const [regenStartTime, setRegenStartTime] = useState<number | null>(null);
  const [regenCurrentTime, setRegenCurrentTime] = useState<number>(0);
  const [allRegenTimes, setAllRegenTimes] = useState<number[]>([]);
  const [averageRegenInterval, setAverageRegenInterval] = useState('');

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

    SendCycleCommand(dataToSend).then(() => {
      if (allRegenTimes.length > 0) {
        const soma = allRegenTimes.reduce((acc, val) => acc + val, 0);
        const media = soma / allRegenTimes.length;
        setAverageRegenInterval(media.toFixed(1));
      }

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

      setLastCycleCommand(CycleCommandEnum.cycle_stop);
    });

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
  }, [SendCycleCommand, allRegenTimes, cycleCommand, selectedCycle, ws]);

  useEffect(() => {
    if (!comingData) return;

    const { regenerationState, totalTime } = comingData.state;

    if (regenerationState === OnOffStateEnum.ON) {
      // se acabou de entrar em "on", salva o tempo de início
      if (regenStartTime === null) {
        setRegenStartTime(Number(totalTime));
        setRegenCurrentTime(0);
      } else {
        // atualiza tempo atual
        setRegenCurrentTime(Number(totalTime) - regenStartTime);
      }
    } else {
      // se estiver "off", zera o contador

      if (regenCurrentTime > 0) {
        setAllRegenTimes((prev) => {
          const newValues = [...prev];
          newValues.push(regenCurrentTime);
          return newValues;
        });
      }
      setRegenStartTime(null);
      setRegenCurrentTime(0);
    }
  }, [allRegenTimes, comingData, regenCurrentTime, regenStartTime]);

  return (
    <Container>
      <Header>
        <div>
          <Title value="Standard Cycle Simulation" />
        </div>
      </Header>
      <Content>
        <LeftContainer>
          <div>
            <InfoContainer>
              <InfoTitle>Cycle Selection</InfoTitle>
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
            <CycleChart
              chartData={cycleData}
              currentTime={Number(comingData?.state.totalTime)}
            />
            <ButtonsContainer>
              <Button
                label="Start"
                size="lg"
                type="button"
                onClick={() => {
                  setCycleCommand(CycleCommandEnum.cycle_start);
                }}
                selected={!!(cycleCommand === CycleCommandEnum.cycle_start)}
              />
              <Button
                label="Cancel"
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
                label="Send Command"
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
                <InfoTitle>Cycle Status</InfoTitle>

                <Info>
                  <InfoLabel>Vehicle Speed</InfoLabel>
                  <InfoText>
                    {comingData?.state.vehicleSpeed || '-'} km/h
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Vehicle Acceleration</InfoLabel>
                  <InfoText>
                    {comingData?.state.vehicleAcceleration || '-'} m/s²
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Cardan Speed:</InfoLabel>
                  <InfoText>
                    {comingData?.state.cardanSpeed || '-'} rpm
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Total Time</InfoLabel>
                  <InfoText>{comingData?.state.totalTime || '-'} s</InfoText>
                </Info>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Current Condition</InfoTitle>
                <MessageComponent message={comingData?.message || '-'} />
                <Info>
                  <InfoLabel>Electric Motor:</InfoLabel>
                  <InfoText
                    color={
                      comingData.state?.motorState === OnOffStateEnum.ON
                        ? themeDefaults.colors.greenButtonColor
                        : themeDefaults.colors.danger
                    }
                  >
                    {comingData.state?.motorState === OnOffStateEnum.ON
                      ? 'Activated'
                      : 'Deactivated'}
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Electric Motor Speed:</InfoLabel>
                  <InfoText>{comingData?.state.motorSpeed || '-'} rpm</InfoText>
                </Info>

                <Info>
                  <InfoLabel>
                    Regeneration ({regenCurrentTime} s) (average:{' '}
                    {averageRegenInterval} s):
                  </InfoLabel>
                  <InfoText
                    color={
                      comingData.state?.regenerationState === OnOffStateEnum.ON
                        ? themeDefaults.colors.greenButtonColor
                        : themeDefaults.colors.danger
                    }
                  >
                    {comingData.state?.regenerationState === OnOffStateEnum.ON
                      ? 'Activated'
                      : 'Deactivated'}
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
