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
import { CycleSegmentEnum } from '@modules/cyclesWithSignals/enums/cycleSegment.enum';
import HybridImage from '../../images/paralel_hybrid.jpg';
import RedArrowImg from '../../images/red_arrow.png';
import BlueArrowImg from '../../images/blue_arrow.png';
import ThrottleIcon from '../../images/accel_icon.png';
import BrakeIcon from '../../images/brake_icon.png';
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
  IconsContainer,
  Icon,
  GearIndicator,
  IconImg,
  PedalValue,
} from './styles';

const CyclesWithSignals: React.FC = () => {
  useEffect(() => {
    document.title = 'Hybrid Test | Ciclos com sinais';
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

  const [currentGear, setCurrentGear] = useState('N');

  const [firstMark, setFirstMark] = useState(0);
  const [secondMark, setSecondMark] = useState(0);

  const [currentCycleSegment, setcurrentCycleSegment] =
    useState<CycleSegmentEnum>(CycleSegmentEnum.THROTTLE);

  const [throttlePercent, setThrottlePercent] = useState(0);
  const [brakePercent, setBrakePercent] = useState(0);

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

    newData.then((result) => {
      const cycleTotalDuration = result[result.length - 1].x;
      const firstMarkDuration = cycleTotalDuration / 3;
      const secondMarkDuration = cycleTotalDuration / 3;

      setFirstMark(firstMarkDuration);
      setSecondMark(firstMarkDuration + secondMarkDuration);
      setCycleData(result);
    });
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

  useEffect(() => {
    if (comingData.state.vehicleSpeed) {
      const speed = Number(comingData.state.vehicleSpeed);

      if (speed === 0) {
        setCurrentGear('N');
      } else if (speed > 0 && speed <= 10) {
        setCurrentGear('1');
      } else if (speed > 10 && speed <= 20) {
        setCurrentGear('2');
      } else if (speed > 20 && speed <= 30) {
        setCurrentGear('3');
      } else if (speed > 30 && speed <= 50) {
        setCurrentGear('4');
      } else if (speed > 50 && speed <= 70) {
        setCurrentGear('5');
      } else if (speed > 70) {
        setCurrentGear('6');
      }
    }
  }, [comingData.state.vehicleSpeed]);

  useEffect(() => {
    if (comingData.state.totalTime) {
      const totalTime = Number(comingData.state.totalTime);

      if (totalTime <= firstMark) {
        setcurrentCycleSegment(CycleSegmentEnum.THROTTLE);
      }

      if (totalTime > firstMark && totalTime <= secondMark) {
        setcurrentCycleSegment(CycleSegmentEnum.BRAKE);
      }

      if (totalTime > secondMark) {
        setcurrentCycleSegment(CycleSegmentEnum.GRADIENT);
      }
    }
  }, [comingData.state.totalTime, firstMark, secondMark]);

  useEffect(() => {
    setThrottlePercent(0);
    setBrakePercent(0);

    if (comingData.state.vehicleAcceleration) {
      const acceleration = Number(comingData.state.vehicleAcceleration);

      if (currentCycleSegment === CycleSegmentEnum.THROTTLE) {
        const percent = Number((acceleration * 0.5 * 100).toFixed(0));

        if (acceleration > 0) {
          // acelerações positivas são geradas pelo pedal do acelerador, negativas por freio motor
          const formattedPercent = percent > 100 ? 100 : percent;
          setThrottlePercent(formattedPercent);
          setBrakePercent(0);
        }

        if (acceleration < 0) {
          setThrottlePercent(0);
        }
      }

      if (currentCycleSegment === CycleSegmentEnum.BRAKE) {
        const percent = Number((acceleration * 0.5 * 100).toFixed(0));

        if (acceleration > 0) {
          // acelerações positivas são geradas pelo pedal de acelerador
          const formattedPercent = percent > 100 ? 100 : percent;
          setThrottlePercent(formattedPercent);
          setBrakePercent(0);
        }
        if (acceleration < 0) {
          // acelerações negativas por pedal do freio
          const formattedPercent = percent < -100 ? -100 : percent;
          setThrottlePercent(0);
          setBrakePercent(-formattedPercent);
        }
      }

      if (currentCycleSegment === CycleSegmentEnum.GRADIENT) {
        const percent = Number((acceleration * 0.5 * 100).toFixed(0));

        if (acceleration < 0) {
          // acelerações positivas são geradas por descidas, negativas são geradas por pedal do freio
          const formattedPercent = percent < -100 ? -100 : percent;
          setThrottlePercent(0);
          setBrakePercent(-formattedPercent);
        }

        if (acceleration > 0) {
          setBrakePercent(0);
        }
      }
    }
  }, [comingData.state.vehicleAcceleration, currentCycleSegment]);

  return (
    <Container>
      <Header>
        <div>
          <Title value="Simulação de ciclo com sinais" />
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
            <CycleChart
              chartData={cycleData}
              currentTime={Number(comingData?.state.totalTime)}
              firstMarker={firstMark}
              secondMarker={secondMark}
            />
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
                  <InfoLabel>
                    Regeneração ({regenCurrentTime} s) (media:{' '}
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
                      ? 'Ativada'
                      : 'Desativada'}
                  </InfoText>
                </Info>
              </InfoContainer>
            </CurrentStatusContainer>
            <ImageContainer>
              <IconsContainer>
                <Icon>
                  <PedalValue>{throttlePercent}%</PedalValue>
                  <IconImg src={ThrottleIcon} alt="ThrottleIcon" />
                </Icon>
                <Icon>
                  <PedalValue>{brakePercent}%</PedalValue>
                  <IconImg src={BrakeIcon} alt="BrakeIcon" />
                </Icon>
              </IconsContainer>
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
              <GearIndicator>
                {currentGear === 'N' ? 'Neutro' : `${currentGear}ª marcha`}
              </GearIndicator>
            </ImageContainer>
          </div>
        </RightContainer>
      </Content>
    </Container>
  );
};

export default CyclesWithSignals;
