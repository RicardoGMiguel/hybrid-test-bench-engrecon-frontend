import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { Code, Heading, Text } from '@chakra-ui/react';
import Button from '@components/Button';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { Container } from './styles';

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <Heading display="inline-block" as="h2" size="2xl" color="primary">
          {error.status}
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          {error.statusText}
        </Text>
        <Text color="gray.500" mb={6}>
          {error.data}
        </Text>

        <Button label="Home" type="button" asLink to={PrivatePathsEnum.HOME} />
      </Container>
    );
  }

  return (
    <Container>
      <Heading display="inline-block" as="h2" size="2xl" color="primary">
        Erro interno
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Ocorreu um erro na aplicação
      </Text>
      <Text color="gray.500" mb={6}>
        Tente novamente mais tarde
      </Text>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {error?.message && (
        <Code mb={6} colorScheme="red">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {error.message}
        </Code>
      )}

      <Button label="Home" type="button" asLink to={PrivatePathsEnum.HOME} />
    </Container>
  );
};

export default ErrorBoundary;
