import Title from '@components/Title';
import React, { useEffect } from 'react';

import { Container, Content, Header } from './styles';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Hybrid Test | Home';
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <Title value="Home" />
        </div>
      </Header>
      <Content>
        <h1>Teste</h1>
      </Content>
    </Container>
  );
};

export default Home;
