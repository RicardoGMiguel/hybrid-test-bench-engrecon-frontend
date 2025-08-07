import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ColorModeScript } from '@chakra-ui/react';

import { queryClient } from '@services/queryClient';
import { theme } from '@hooks/ChakraProvider';
import AppProvider from '@hooks/index';

import Router from './routes/Router';
import GlobalStyle from './style/global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <AppProvider>
        <Router />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
