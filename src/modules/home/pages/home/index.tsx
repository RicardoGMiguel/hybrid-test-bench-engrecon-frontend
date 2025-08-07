import Title from '@components/Title';
import React, { useEffect } from 'react';

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
} from './styles';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Hybrid Test | Home';
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
