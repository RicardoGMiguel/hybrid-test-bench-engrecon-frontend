import React from 'react';
import {
  ChakraProvider as ChakraUIProvider,
  extendTheme,
  Theme as ChakraTheme,
} from '@chakra-ui/react';

import themeDefaults from '../../style/themeDefaults';

const theme = extendTheme({
  semanticTokens: {
    colors: themeDefaults.colors,
  },
  fonts: {
    heading: themeDefaults.fontFamily,
    body: themeDefaults.fontFamily,
  },
  styles: {
    global: {
      body: {
        bg: themeDefaults.colors.white,
      },
    },
  },
  initialColorMode: 'light',
  useSystemColorMode: true,
}) as ChakraTheme;

type ChakraProviderProps = {
  children: React.ReactNode;
};

const ChakraProvider: React.FC<ChakraProviderProps> = ({ children }) => (
  <ChakraUIProvider theme={theme}>{children}</ChakraUIProvider>
);

export { ChakraProvider, theme };
