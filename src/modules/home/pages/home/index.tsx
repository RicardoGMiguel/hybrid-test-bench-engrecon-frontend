import Title from '@components/Title';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
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
} from './styles';
import {
  EditSettingsFormData,
  editSettingsFormResolver,
} from './editSettingsForm.zod';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Hybrid Test | Home';
  }, []);

  const { addToast } = useToast();
  const { SendCommand } = useHome();

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
  } = useForm<EditSettingsFormData>({
    resolver: editSettingsFormResolver,
    mode: 'all',
  });

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
          cardanSpeed: data.cardanSpeed,
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

  return (
    <Container>
      <Header>
        <div>
          <Title value="Teste de acoplamento" />
        </div>
      </Header>
      <Content>
        <LeftContainer>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InfoContainer>
                <InfoTitle>Configuração do teste</InfoTitle>
                <Info>
                  <FormControl isInvalid={!!errors.cardanSpeed}>
                    <SettingsInput
                      label="Velocidade do eixo-cardan (rpm)"
                      register={register}
                      name="cardanSpeed"
                      state={getFieldState('cardanSpeed')}
                      errors={errors.cardanSpeed}
                      type="number"
                      min={0}
                      max={3600}
                    />
                    <FormErrorMessage>
                      {errors.cardanSpeed?.message}
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
                    />
                    <FormErrorMessage>
                      {errors.rampTime?.message}
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
                  label="Acoplar"
                  size="lg"
                  type="button"
                  onClick={() => {
                    setCommand(CommandEnum.start);
                  }}
                  selected={!!(command === CommandEnum.start)}
                />
                <Button
                  label="Desacoplar"
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
            <Oscilloscope chartData={comingData.chart} />
          </div>
        </RightContainer>
      </Content>
    </Container>
  );
};

export default Home;
