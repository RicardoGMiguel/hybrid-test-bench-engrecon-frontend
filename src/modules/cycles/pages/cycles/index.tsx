import Title from '@components/Title';
import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';

import { useCycle } from '@modules/cycles/hooks/index';
import Button from '@components/Button';
import SettingsInput from '@components/Form/SettingsInput';

import { CyclesEnum } from '@modules/cycles/enums/cycles.enum';

import { CycleCommandEnum } from '@modules/cycles/enums/cycleCommand.enum';
import CycleChart from '@modules/cycles/components/CycleChart';
import { ICycle } from '@modules/cycles/interfaces/ICycle';
import MessageComponent from '@modules/home/components/MessageComponent';
import themeDefaults from '@style/themeDefaults';
import { IFormSendCycleCommand } from '@modules/cycles/interfaces/IFormSendCycleCommand';
import { IComingData } from '@modules/home/interfaces/IComingData';

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
  FormContainer,
  PreviewLabel,
  PreviewInfoText,
  PreviewInfo,
} from './styles';

import {
  EditCyclesSettingsFormData,
  editCyclesSettingsFormResolver,
} from './editCyclesSettingsForm.zod';

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
      motorState: false,
      regenerationState: false,
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

  const {
    getFieldState,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EditCyclesSettingsFormData>({
    resolver: editCyclesSettingsFormResolver,
    mode: 'all',
  });

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

  const onSubmit = useCallback(
    async (data: EditCyclesSettingsFormData) => {
      const dataToSend: IFormSendCycleCommand = {
        cmd: cycleCommand,
        cycle: selectedCycle,
      };

      console.log('brakeTorque: ', data.brakeTorque);

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
            motorState: false,
            regenerationState: false,
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
          const newComingData = JSON.parse(event.data);
          const newStateComingData: IComingData = newComingData.state;

          setComingData(newStateComingData);
          console.log(newStateComingData);
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
            motorState: false,
            regenerationState: false,
            vehicleSpeed: '-',
            vehicleAcceleration: '-',
            totalTime: '-',
          },
          chart: [],
        });
      }
    },
    [SendCycleCommand, allRegenTimes, cycleCommand, selectedCycle, ws]
  );

  useEffect(() => {
    if (!comingData) return;

    const { regenerationState, totalTime } = comingData.state;

    if (regenerationState) {
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

  const [brakePressure, setBrakePressure] = useState(0);

  const watchBrakeTorque = watch('brakeTorque');

  useEffect(() => {
    const pi = 3.1416;
    const pumpDisplacement = 50; // ccm
    const pressurePa =
      (2 * pi * 1000000 * Number(watchBrakeTorque)) / pumpDisplacement;
    const pressureBar = pressurePa / 100000;
    setBrakePressure(pressureBar);
  }, [watchBrakeTorque]);

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
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <FormContainer>
                <PreviewInfo>
                  <FormControl isInvalid={!!errors.brakeTorque}>
                    <SettingsInput
                      label="Hydraulic Brake Torque (Nm)"
                      register={register}
                      name="brakeTorque"
                      state={getFieldState('brakeTorque')}
                      errors={errors.brakeTorque}
                      type="number"
                      min={0}
                      max={300}
                    />
                    <FormErrorMessage>
                      {errors.brakeTorque?.message}
                    </FormErrorMessage>
                  </FormControl>
                </PreviewInfo>
                <PreviewInfo>
                  <PreviewLabel>Hydraulic Brake Pressure:</PreviewLabel>
                  <PreviewInfoText>
                    {brakePressure.toFixed(0)} bar
                  </PreviewInfoText>
                </PreviewInfo>
              </FormContainer>
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
                  type="submit"
                  selected
                  disabled={
                    isSubmitting || !!(lastCycleCommand === cycleCommand)
                  }
                />
              </ButtonsContainer>
            </form>
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
                  <InfoLabel>Driveshaft Speed:</InfoLabel>
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
                      comingData.state?.motorState
                        ? themeDefaults.colors.greenButtonColor
                        : themeDefaults.colors.danger
                    }
                  >
                    {comingData.state?.motorState ? 'Activated' : 'Deactivated'}
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
                      comingData.state?.regenerationState
                        ? themeDefaults.colors.greenButtonColor
                        : themeDefaults.colors.danger
                    }
                  >
                    {comingData.state?.regenerationState
                      ? 'Activated'
                      : 'Deactivated'}
                  </InfoText>
                </Info>
              </InfoContainer>
            </CurrentStatusContainer>
            <CurrentStatusContainer>
              <InfoContainer>
                <InfoTitle>Test bench status</InfoTitle>

                <Info>
                  <InfoLabel>Hydraulic Brake Pressure:</InfoLabel>
                  <InfoText>200 bar</InfoText>
                </Info>
                <Info>
                  <InfoLabel>Oil Temperature:</InfoLabel>
                  <InfoText>50 °C</InfoText>
                </Info>
                <Info>
                  <InfoLabel>Battery SOC:</InfoLabel>
                  <InfoText>80%</InfoText>
                </Info>
                <Info>
                  <InfoLabel>Accumulated Energy Consumption:</InfoLabel>
                  <InfoText>100 kWh</InfoText>
                </Info>
              </InfoContainer>
              <InfoContainer>
                <ImageContainer>
                  <VehicleImg src={HybridImage} alt="Hybrid" />
                  <RedArrow
                    src={RedArrowImg}
                    alt="redArrow"
                    visible={!!comingData?.state.motorState}
                  />
                  <BlueArrow
                    src={BlueArrowImg}
                    alt="blueArrow"
                    visible={!!comingData?.state.regenerationState}
                  />
                </ImageContainer>
              </InfoContainer>
            </CurrentStatusContainer>
          </div>
        </RightContainer>
      </Content>
    </Container>
  );
};

export default Cycles;
