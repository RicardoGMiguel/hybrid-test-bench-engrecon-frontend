import Title from '@components/Title';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

import { CouplingModesEnum } from '@modules/home/enums/couplingModes.enum';
import SettingsInput from '@components/Form/SettingsInput';
import Button from '@components/Button';
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

  const [couplingMode, setCouplingMode] = useState<CouplingModesEnum>();
  const [, setIsLoading] = useState(false);

  const {
    getFieldState,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditSettingsFormData>({
    resolver: editSettingsFormResolver,
    mode: 'all',
  });

  const onSubmit = useCallback(async (data: EditSettingsFormData) => {
    try {
      setIsLoading(true);

      console.log(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

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
            <InfoContainer>
              <InfoTitle>Configuração do teste</InfoTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Info>
                  <FormControl isInvalid={!!errors.cardanSpeed}>
                    <SettingsInput
                      label="Velocidade do eixo-cardan (rpm)"
                      register={register}
                      name="cardanSpeed"
                      state={getFieldState('cardanSpeed')}
                      errors={errors.cardanSpeed}
                      onSubmit={() => handleSubmit(onSubmit)}
                    />
                    <FormErrorMessage>
                      {errors.cardanSpeed?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Info>
              </form>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>Condição atual</InfoTitle>
              <Info>
                <InfoLabel>Velocidade do eixo-cardan:</InfoLabel>
                <InfoText>1234 rpm</InfoText>
              </Info>
              <Info>
                <InfoLabel>Velocidade do motor elétrico:</InfoLabel>
                <InfoText>1120 rpm</InfoText>
              </Info>
              <Info>
                <InfoLabel>Delay entre eixos:</InfoLabel>
                <InfoText>1,2 ms</InfoText>
              </Info>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>Modos de acoplamento</InfoTitle>
              <CouplingModeButtons>
                <RadioButtonContainer>
                  <ButtonLabel>Livre</ButtonLabel>
                  <RadioButton
                    onClick={() => setCouplingMode(CouplingModesEnum.FREE)}
                    selected={!!(couplingMode === CouplingModesEnum.FREE)}
                  >
                    <div />
                  </RadioButton>
                </RadioButtonContainer>
                <RadioButtonContainer>
                  <ButtonLabel>Mesma velocidade</ButtonLabel>
                  <RadioButton
                    onClick={() =>
                      setCouplingMode(CouplingModesEnum.SAME_SPEED)
                    }
                    selected={!!(couplingMode === CouplingModesEnum.SAME_SPEED)}
                  >
                    <div />
                  </RadioButton>
                </RadioButtonContainer>
                <RadioButtonContainer>
                  <ButtonLabel>Mesma velocidade e fase</ButtonLabel>
                  <RadioButton
                    onClick={() =>
                      setCouplingMode(CouplingModesEnum.SAME_PHASE)
                    }
                    selected={!!(couplingMode === CouplingModesEnum.SAME_PHASE)}
                  >
                    <div />
                  </RadioButton>
                </RadioButtonContainer>
              </CouplingModeButtons>
            </InfoContainer>
            <ButtonsContainer>
              <Button label="Acoplar" size="lg" />
              <Button label="Desacoplar" size="lg" />
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

export default Home;
