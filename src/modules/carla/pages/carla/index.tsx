import Title from '@components/Title';
import React, { useEffect, useState, useCallback } from 'react';

import { useCarla } from '@modules/carla/hooks/index';
import Button from '@components/Button';

import CarlaImg from '@modules/carla/images/carla-logo.png';
import MessageComponent from '@modules/home/components/MessageComponent';
import themeDefaults from '@style/themeDefaults';
import { IComingData } from '@modules/home/interfaces/IComingData';
import { OnOffStateEnum } from '@modules/home/enums/onOffStates.enum';
import { IFormSendCarlaCommand } from '@modules/carla/interfaces/IFormSendCarlaCommand';
import { CarlaCommandEnum } from '@modules/carla/enums/carlaCommand.enum';
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
  ButtonsContainer,
  Info,
  InfoLabel,
  InfoText,
  CurrentStatusContainer,
  ImageContainer,
  RedArrow,
  BlueArrow,
  VehicleImg,
  CarlaLogo,
} from './styles';

const Carla: React.FC = () => {
  useEffect(() => {
    document.title = 'Hybrid Test | Carla Simulator';
  }, []);

  const [carlaCommand, setCarlaCommand] = useState<CarlaCommandEnum>(
    CarlaCommandEnum.carla_stop
  );
  const [lastCarlaCommand, setLastCarlaCommand] = useState<CarlaCommandEnum>(
    CarlaCommandEnum.carla_stop
  );

  const [ws, setWs] = useState<WebSocket | null>(null);

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

  const { SendCarlaCommand } = useCarla();

  const onSubmit = useCallback(async () => {
    const dataToSend: IFormSendCarlaCommand = {
      cmd: carlaCommand,
    };

    SendCarlaCommand(dataToSend);

    setLastCarlaCommand(carlaCommand);

    if (carlaCommand === CarlaCommandEnum.carla_start) {
      const socket = new WebSocket('ws://localhost:8080');

      socket.onmessage = (event) => {
        const newComingData: IComingData = JSON.parse(event.data);

        setComingData(newComingData);
      };

      setWs(socket);
    }

    if (carlaCommand === CarlaCommandEnum.carla_stop) {
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
  }, [carlaCommand, SendCarlaCommand, ws]);

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
          <Title value="Simulação com CARLA Simulator" />
        </div>
      </Header>
      <Content>
        <LeftContainer>
          <div>
            <CarlaLogo src={CarlaImg} alt="CarlaLogo" />
            <ButtonsContainer>
              <Button
                label="Iniciar"
                size="lg"
                type="button"
                onClick={() => {
                  setCarlaCommand(CarlaCommandEnum.carla_start);
                }}
                selected={!!(carlaCommand === CarlaCommandEnum.carla_start)}
              />
              <Button
                label="Cancelar"
                size="lg"
                type="button"
                onClick={() => {
                  setCarlaCommand(CarlaCommandEnum.carla_stop);
                }}
                selected={!!(carlaCommand === CarlaCommandEnum.carla_stop)}
              />
            </ButtonsContainer>
            <ButtonsContainer>
              <Button
                label="Enviar comando"
                size="lg"
                type="button"
                selected
                onClick={() => onSubmit()}
                disabled={!!(lastCarlaCommand === carlaCommand)}
              />
            </ButtonsContainer>
          </div>
        </LeftContainer>
        <RightContainer>
          <div>
            <CurrentStatusContainer>
              <InfoContainer>
                <InfoTitle>Status da simulação</InfoTitle>

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
                  <InfoText>- s</InfoText>
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
                  <InfoLabel>Regeneração ({regenCurrentTime} s)</InfoLabel>
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

export default Carla;
