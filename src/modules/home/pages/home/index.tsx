import Title from '@components/Title';
import { useForm } from 'react-hook-form';
import {
  Box,
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

import MessageComponent from '@modules/home/components/MessageComponent';
import themeDefaults from '@style/themeDefaults';
import { IFormSendCommand } from '@modules/home/interfaces/IFormSendCommand';
import { CommandEnum } from '@modules/home/enums/comman.enum';
import { IComingData } from '@modules/home/interfaces/IComingData';
import { OnOffStateEnum } from '@modules/home/enums/onOffStates.enum';
import { IOscilloscopeProps } from '@modules/home/interfaces/IOscilloscopeProps';
import TestChart from '@modules/home/components/testChart';
import ResultsChart from '@modules/home/components/resultsChart';
import Oscilloscope from '@modules/home/components/oscilloscope';
import { useHome } from '../../hooks/index';
import {
  Container,
  Content,
  Header,
  ModeSelectionContainer,
  ModeSelectionButton,
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
  // const phaseShift = 0.0008;

  // const staticData: IOscilloscopeProps[] = [
  //   {
  //     id: 'Signal 1',
  //     color: 'hsl(0, 70%, 50%)',
  //     data: [
  //       { x: 0, y: 0 },
  //       { x: 0.01, y: 1 },
  //       { x: 0.02, y: 0 },
  //       { x: 0.03, y: 1 },
  //       { x: 0.04, y: 0 },
  //       { x: 0.05, y: 1 },
  //       { x: 0.06, y: 0 },
  //       { x: 0.07, y: 1 },
  //       { x: 0.08, y: 0 },
  //     ],
  //   },
  //   {
  //     id: 'Signal 2',
  //     color: 'hsl(240, 70%, 50%)',
  //     data: [
  //       { x: 0, y: 0 },
  //       { x: 0.01 + phaseShift, y: 1 },
  //       { x: 0.02 + phaseShift, y: 0 },
  //       { x: 0.03 + phaseShift, y: 1 },
  //       { x: 0.04 + phaseShift, y: 0 },
  //       { x: 0.05 + phaseShift, y: 1 },
  //       { x: 0.06 + phaseShift, y: 0 },
  //       { x: 0.07 + phaseShift, y: 1 },
  //       { x: 0.08 + phaseShift, y: 0 },
  //     ],
  //   },
  // ];

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

  const staticSpeedResults: IOscilloscopeProps[] = [
    {
      id: 'Cardan',
      color: 'hsl(240, 70%, 50%)',
      data: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 1500 },
        { x: 11, y: 1700 },
      ],
    },
    {
      id: 'Coroa',
      color: 'hsl(0, 70%, 50%)',

      data: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 3.5, y: 200 },
        { x: 4, y: 800 },
        { x: 4.5, y: 1400 },
        { x: 4.6, y: 1500 },
        { x: 4.7, y: 1570 },
        { x: 11, y: 1700 },
      ],
    },
  ];

  const staticSpeedDiffResults: IOscilloscopeProps[] = [
    {
      id: 'Difer.',
      color: '#000',
      data: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 1500 },
        { x: 2, y: 1510 },
        { x: 3, y: 1520 },
        { x: 3.5, y: 1320 },
        { x: 4, y: 600 },
        { x: 4.5, y: 150 },
        { x: 4.6, y: 50 },
        { x: 4.7, y: 20 },
        { x: 11, y: 0 },
      ],
    },
  ];

  const staticSleevePositionDiffResults: IOscilloscopeProps[] = [
    {
      id: 'Vel.',
      color: 'hsl(0, 96.76113360323887%, 48.4313725490196%)',
      data: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 5.2, y: 0.1 },
        { x: 5.4, y: 0.2 },
        { x: 5.6, y: 0.4 },
        { x: 5.8, y: 1.6 },
        { x: 6, y: 3 },
        { x: 6.2, y: 5 },
        { x: 6.4, y: 6.4 },
        { x: 6.6, y: 7.6 },
        { x: 6.8, y: 7.8 },
        { x: 7, y: 8 },
        { x: 8, y: 8 },
        { x: 9, y: 8 },
        { x: 10, y: 8 },
        { x: 11, y: 8 },
      ],
    },
  ];

  const staticSleeveSpeedDiffResults: IOscilloscopeProps[] = [
    {
      id: 'Vel.',
      color: 'hsl(0, 96.76113360323887%, 48.4313725490196%)',
      data: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 15 },
        { x: 7, y: 0 },
        { x: 8, y: 0 },
        { x: 9, y: 0 },
        { x: 10, y: 0 },
        { x: 11, y: 0 },
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

  const watchCardanInitialSpeed = watch('cardanInitialSpeed');
  const watchCardanEndSpeed = watch('cardanEndSpeed');
  const watchCardanTestTotalTime = watch('cardanTestTotalTime');
  const watchCouplingInstant = watch('couplingInstant');

  useEffect(() => {
    const currentTestData = [...testChartData];
    currentTestData[0].data[0].x = 0;
    currentTestData[0].data[0].y = 0;

    currentTestData[0].data[1].x = 0;
    currentTestData[0].data[1].y = 0;

    currentTestData[0].data[2].x = 1;
    currentTestData[0].data[2].y = Number(watchCardanInitialSpeed);

    currentTestData[0].data[3].x = 1 + Number(watchCardanTestTotalTime);
    currentTestData[0].data[3].y = Number(watchCardanEndSpeed);

    currentTestData[0].data[4].x = 3 + Number(watchCardanTestTotalTime);
    currentTestData[0].data[4].y = Number(watchCardanEndSpeed);

    setTestChartData(currentTestData);
    setVerticalLine(Number(watchCouplingInstant) + 1);
  }, [
    testChartData,
    watchCardanEndSpeed,
    watchCardanInitialSpeed,
    watchCardanTestTotalTime,
    watchCouplingInstant,
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
          cardanInitialSpeed: data.cardanInitialSpeed,
          cardanEndSpeed: data.cardanEndSpeed,
          cardanTestTotalTime: data.cardanTestTotalTime,
          couplingInstant: data.couplingInstant,
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

  const [showResults, setShowResults] = useState(false);

  return (
    <Container>
      <Header>
        <div>
          <Title value="Teste de acoplamento" />
          <ModeSelectionContainer>
            <ModeSelectionButton
              selected={!showResults}
              onClick={() => setShowResults(false)}
            >
              Sensores
            </ModeSelectionButton>
            <ModeSelectionButton
              selected={showResults}
              onClick={() => setShowResults(true)}
            >
              Resultados
            </ModeSelectionButton>
          </ModeSelectionContainer>
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
                  <FormControl isInvalid={!!errors.cardanInitialSpeed}>
                    <SettingsInput
                      label="Velocidade inicial do eixo-cardan (rpm)"
                      register={register}
                      name="cardanInitialSpeed"
                      state={getFieldState('cardanInitialSpeed')}
                      errors={errors.cardanInitialSpeed}
                      type="number"
                      min={0}
                      max={3600}
                      onFocusCapture={() => onOpen()}
                      onBlurCapture={() => onClose()}
                    />
                    <FormErrorMessage>
                      {errors.cardanInitialSpeed?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Info>
                <Info>
                  <FormControl isInvalid={!!errors.cardanEndSpeed}>
                    <SettingsInput
                      label="Velocidade final do eixo-cardan (rpm)"
                      register={register}
                      name="cardanEndSpeed"
                      state={getFieldState('cardanEndSpeed')}
                      errors={errors.cardanEndSpeed}
                      type="number"
                      min={0}
                      max={3600}
                      onFocusCapture={() => onOpen()}
                      onBlurCapture={() => onClose()}
                    />
                    <FormErrorMessage>
                      {errors.cardanEndSpeed?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Info>
                <Info>
                  <FormControl isInvalid={!!errors.cardanTestTotalTime}>
                    <SettingsInput
                      label="Tempo de rampa (segundos)"
                      register={register}
                      name="cardanTestTotalTime"
                      state={getFieldState('cardanTestTotalTime')}
                      errors={errors.cardanTestTotalTime}
                      type="number"
                      min={0}
                      max={120}
                      onFocusCapture={() => onOpen()}
                      onBlurCapture={() => onClose()}
                    />
                    <FormErrorMessage>
                      {errors.cardanTestTotalTime?.message}
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
            {!showResults ? (
              <Oscilloscope chartData={comingData.chart} />
            ) : (
              <Grid
                gap={6}
                templateColumns="repeat(2, 1fr)"
                templateRows="repeat(2, 1fr)"
                h="100%"
              >
                <GridItem>
                  <Box height="100%">
                    <ResultsChart
                      title="Velocidades de cardan e coroa"
                      axisLeftLegend="Velocidade {RPM)"
                      chartData={staticSpeedResults}
                      couplingCommandInstant={3}
                      startCoupling={5}
                      endCoupling={7}
                    />
                  </Box>
                </GridItem>
                <GridItem>
                  <Box height="100%">
                    <ResultsChart
                      title="Diferença angular"
                      axisLeftLegend="Velocidade {RPM)"
                      chartData={staticSpeedDiffResults}
                      couplingCommandInstant={3}
                      startCoupling={5}
                      endCoupling={7}
                    />
                  </Box>
                </GridItem>
                <GridItem>
                  <Box height="100%">
                    <ResultsChart
                      title="Posição da luva"
                      axisLeftLegend="Posição {mm)"
                      chartData={staticSleevePositionDiffResults}
                      couplingCommandInstant={3}
                      startCoupling={5}
                      endCoupling={7}
                    />
                  </Box>
                </GridItem>
                <GridItem>
                  <Box height="100%">
                    <ResultsChart
                      title="Velocidade da Luva"
                      axisLeftLegend="Velocidade {m/s)"
                      chartData={staticSleeveSpeedDiffResults}
                      couplingCommandInstant={3}
                      startCoupling={5}
                      endCoupling={7}
                    />
                  </Box>
                </GridItem>
              </Grid>
            )}
          </div>
        </RightContainer>
      </Content>
    </Container>
  );
};

export default Home;
