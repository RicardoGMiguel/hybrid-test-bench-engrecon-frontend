import Title from '@components/Title';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useToast } from '@hooks/toast';

import { CouplingModesEnum } from '@modules/home/enums/couplingModes.enum';
import SettingsInput from '@components/Form/SettingsInput';
import Button from '@components/Button';
import Oscilloscope from '@modules/home/components/oscilloscope';
import MessageComponent from '@modules/home/components/MessageComponent';
import themeDefaults from '@style/themeDefaults';
import { IFormSendCommand } from '@modules/home/interfaces/IFormSendCommand';
import { CommandEnum } from '@modules/home/enums/comman.enum';
import { IComingData } from '@modules/home/interfaces/IComingData';
import { OnOffStateEnum } from '@modules/home/enums/onOffStates.enum';
import { IOscilloscopeProps } from '@modules/home/interfaces/IOscilloscopeProps';
import TestChart from '@modules/home/components/testChart';
import { useHome } from '../../hooks/index';
import {
  Container,
  Content,
  Header,
  LeftContainer,
  RightContainer,
  InfoContainer,
  Info,
  InfoTitle,
  InfoLabel,
  InfoText,
  CouplingModeButtons,
  RadioButtonContainer,
  ButtonLabel,
  RadioButton,
  ButtonsContainer,
  ConfigTestChartContainer,
} from './styles';
import {
  EditSettingsFormData,
  editSettingsFormResolver,
} from './editSettingsForm.zod';

const Home: React.FC = () => {
  const phaseShift = 0.001;

  const staticData: IOscilloscopeProps[] = [
    {
      id: 'Signal 1',
      color: 'hsl(0, 70%, 50%)',
      data: [
        { x: 0, y: 0 },
        { x: 0.01, y: 1 },
        { x: 0.02, y: 0 },
        { x: 0.03, y: 1 },
        { x: 0.04, y: 0 },
        { x: 0.05, y: 1 },
        { x: 0.06, y: 0 },
        { x: 0.07, y: 1 },
        { x: 0.08, y: 0 },
      ],
    },
    {
      id: 'Signal 2',
      color: 'hsl(240, 70%, 50%)',
      data: [
        { x: 0, y: 0 },
        { x: 0.01 + phaseShift, y: 1 },
        { x: 0.02 + phaseShift, y: 0 },
        { x: 0.03 + phaseShift, y: 1 },
        { x: 0.04 + phaseShift, y: 0 },
        { x: 0.05 + phaseShift, y: 1 },
        { x: 0.06 + phaseShift, y: 0 },
        { x: 0.07 + phaseShift, y: 1 },
        { x: 0.08 + phaseShift, y: 0 },
      ],
    },
  ];

  const initialTestChartData: IOscilloscopeProps[] = [
    {
      id: 'Perfil de velocidade',
      color: 'blue',
      data: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 3 },
        { x: 5, y: 4 },
        { x: 7, y: 4 },
      ],
    },
  ];

  useEffect(() => {
    document.title = 'Hybrid Test | Home';
  }, []);

  const { addToast } = useToast();
  const { SendCommand } = useHome();

  const [testChartData, setTestChartData] =
    useState<IOscilloscopeProps[]>(initialTestChartData);

  const [verticalLine, setVerticalLine] = useState(0);

  const [couplingMode, setCouplingMode] = useState<CouplingModesEnum>(
    CouplingModesEnum.FREE
  );
  const [command, setCommand] = useState<CommandEnum>(CommandEnum.stop);
  const [comingData, setComingData] = useState<IComingData>({
    message: '-',
    state: {
      cardanSpeed: '-',
      motorSpeed: '-',
      delay: '-',
      stepperMotorState: '-',
    },
    chart: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const {
    getFieldState,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EditSettingsFormData>({
    resolver: editSettingsFormResolver,
    mode: 'all',
  });

  const watchInitialSpeed = watch('initialSpeed');
  const watchEndSpeed = watch('endSpeed');
  const watchRampTime = watch('rampTime');
  const watchCouplingInstant = watch('couplingInstant');

  useEffect(() => {
    const currentTestData = [...testChartData];
    currentTestData[0].data[0].x = 0;
    currentTestData[0].data[0].y = 0;

    currentTestData[0].data[1].x = 0;
    currentTestData[0].data[1].y = 0;

    currentTestData[0].data[2].x = 1;
    currentTestData[0].data[2].y = Number(watchInitialSpeed);

    currentTestData[0].data[3].x = 1 + Number(watchRampTime);
    currentTestData[0].data[3].y = Number(watchEndSpeed);

    currentTestData[0].data[4].x = 3 + Number(watchRampTime);
    currentTestData[0].data[4].y = Number(watchEndSpeed);

    setTestChartData(currentTestData);
    setVerticalLine(Number(watchCouplingInstant));
  }, [
    testChartData,
    watchCouplingInstant,
    watchEndSpeed,
    watchInitialSpeed,
    watchRampTime,
  ]);

  const onSubmit = useCallback(
    async (data: EditSettingsFormData) => {
      try {
        setIsLoading(true);
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

        const dataToSend: IFormSendCommand = {
          cmd: command,
          mode: couplingMode,
          cardanSpeed: data.initialSpeed,
          rampTime: data.rampTime,
        };

        setLastRequestTime(now);
        await SendCommand(dataToSend);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);

        if (command === CommandEnum.start) {
          const ws = new WebSocket('ws://localhost:8080');

          ws.onmessage = (event) => {
            const newComingData: IComingData = JSON.parse(event.data);

            setComingData(newComingData);
          };
        } else {
          setComingData({
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
      }
    },
    [SendCommand, addToast, command, couplingMode, lastRequestTime]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container>
      <Header>
        <div>
          <Title value="Teste de acoplamento" />
          <h1>Teste em tempo real</h1>
        </div>
      </Header>
      <Content>
        <LeftContainer>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InfoContainer>
                <ConfigTestChartContainer isOpen={isOpen}>
                  <TestChart
                    chartData={testChartData}
                    couplingVerticalLine={verticalLine}
                  />
                </ConfigTestChartContainer>
                <InfoTitle>Configuração do teste</InfoTitle>
                <Info>
                  <FormControl isInvalid={!!errors.initialSpeed}>
                    <SettingsInput
                      label="Velocidade inicial do eixo-cardan (rpm)"
                      register={register}
                      name="initialSpeed"
                      state={getFieldState('initialSpeed')}
                      errors={errors.initialSpeed}
                      type="number"
                      min={0}
                      max={3600}
                      onFocusCapture={() => onOpen()}
                      onBlurCapture={() => onClose()}
                    />
                    <FormErrorMessage>
                      {errors.initialSpeed?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Info>
                <Info>
                  <FormControl isInvalid={!!errors.endSpeed}>
                    <SettingsInput
                      label="Velocidade final do eixo-cardan (rpm)"
                      register={register}
                      name="endSpeed"
                      state={getFieldState('endSpeed')}
                      errors={errors.endSpeed}
                      type="number"
                      min={0}
                      max={3600}
                      onFocusCapture={() => onOpen()}
                      onBlurCapture={() => onClose()}
                    />
                    <FormErrorMessage>
                      {errors.endSpeed?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Info>
                <Info>
                  <FormControl isInvalid={!!errors.rampTime}>
                    <SettingsInput
                      label="Tempo de rampa (segundos)"
                      register={register}
                      name="rampTime"
                      state={getFieldState('rampTime')}
                      errors={errors.rampTime}
                      type="number"
                      min={0}
                      max={120}
                      onFocusCapture={() => onOpen()}
                      onBlurCapture={() => onClose()}
                    />
                    <FormErrorMessage>
                      {errors.rampTime?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Info>
                <Info>
                  <FormControl isInvalid={!!errors.couplingInstant}>
                    <SettingsInput
                      label="Instante de acoplamento (segundos)"
                      register={register}
                      name="couplingInstant"
                      state={getFieldState('couplingInstant')}
                      errors={errors.couplingInstant}
                      type="number"
                      min={0}
                      max={120}
                      onFocusCapture={() => onOpen()}
                      onBlurCapture={() => onClose()}
                    />
                    <FormErrorMessage>
                      {errors.couplingInstant?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Info>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Condição atual</InfoTitle>
                <MessageComponent message={comingData?.message || '-'} />
                <Info>
                  <InfoLabel>Velocidade do eixo-cardan:</InfoLabel>
                  <InfoText>
                    {comingData.state?.cardanSpeed || '-'} rpm
                  </InfoText>
                </Info>
                <Info>
                  <InfoLabel>Velocidade do motor elétrico:</InfoLabel>
                  <InfoText>{comingData.state?.motorSpeed || '-'} rpm</InfoText>
                </Info>
                <Info>
                  <InfoLabel>Delay entre eixos:</InfoLabel>
                  <InfoText>{comingData.state?.delay || '-'} ms</InfoText>
                </Info>
                <Info>
                  <InfoLabel>Motor de passo:</InfoLabel>
                  <InfoText
                    color={
                      comingData.state?.stepperMotorState === OnOffStateEnum.ON
                        ? themeDefaults.colors.greenButtonColor
                        : themeDefaults.colors.danger
                    }
                  >
                    {comingData.state?.stepperMotorState === OnOffStateEnum.ON
                      ? 'Ativado'
                      : 'Desativado'}
                  </InfoText>
                </Info>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Modos de acoplamento</InfoTitle>
                <CouplingModeButtons>
                  <RadioButtonContainer>
                    <ButtonLabel>Free</ButtonLabel>
                    <RadioButton
                      onClick={() => setCouplingMode(CouplingModesEnum.FREE)}
                      selected={!!(couplingMode === CouplingModesEnum.FREE)}
                    >
                      <div />
                    </RadioButton>
                  </RadioButtonContainer>
                  <RadioButtonContainer>
                    <ButtonLabel>Light</ButtonLabel>
                    <RadioButton
                      onClick={() => setCouplingMode(CouplingModesEnum.LIGHT)}
                      selected={!!(couplingMode === CouplingModesEnum.LIGHT)}
                    >
                      <div />
                    </RadioButton>
                  </RadioButtonContainer>
                  <RadioButtonContainer>
                    <ButtonLabel>Heavy</ButtonLabel>
                    <RadioButton
                      onClick={() => setCouplingMode(CouplingModesEnum.HEAVY)}
                      selected={!!(couplingMode === CouplingModesEnum.HEAVY)}
                    >
                      <div />
                    </RadioButton>
                  </RadioButtonContainer>
                </CouplingModeButtons>
              </InfoContainer>
              <ButtonsContainer>
                <Button
                  label="Iniciar"
                  size="lg"
                  type="button"
                  onClick={() => {
                    setCommand(CommandEnum.start);
                  }}
                  selected={!!(command === CommandEnum.start)}
                />
                <Button
                  label="Parar"
                  size="lg"
                  type="button"
                  onClick={() => {
                    setCommand(CommandEnum.stop);
                  }}
                  selected={!!(command === CommandEnum.stop)}
                />
              </ButtonsContainer>
              <ButtonsContainer>
                <Button
                  label="Enviar comando"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  selected
                />
              </ButtonsContainer>
            </form>
          </div>
        </LeftContainer>
        <RightContainer>
          <div>
            {/* <Oscilloscope chartData={comingData.chart} /> */}
            {/* <Oscilloscope chartData={staticData} /> */}
            <Grid gap={6}>
              <GridItem rowSpan={1} colSpan={1}>
                <Oscilloscope chartData={staticData} />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Oscilloscope chartData={staticData} />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Oscilloscope chartData={staticData} />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Oscilloscope chartData={staticData} />
              </GridItem>
            </Grid>
          </div>
        </RightContainer>
      </Content>
    </Container>
  );
};

export default Home;
