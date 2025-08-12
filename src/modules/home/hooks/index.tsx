import React, { createContext, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';

import { IFormSendCommand } from '@modules/home/interfaces/IFormSendCommand';

import { useToast } from '@hooks/toast';

interface HomeContextData {
  SendCommand: (requestData: IFormSendCommand) => Promise<void>;
}

const HomeContext = createContext<HomeContextData>({} as HomeContextData);

interface IHomeProviderProps {
  children: React.ReactNode;
}

const HomeProvider: React.FC<IHomeProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const SendCommand = useMutation(
    async (formData: IFormSendCommand) => {
      const { data } = await api.post(apiRoutes.serialCommand, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Comandos enviados com sucesso',
          type: 'success',
        });
      },
      onError: (error) => {
        errorHandler({
          error,
          addToast,
          title: 'Ocorreu um erro!',
        });
      },
    }
  ).mutateAsync;

  return (
    <HomeContext.Provider
      value={{
        SendCommand,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

function useHome(): HomeContextData {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHome must be used within a HomeProvider');
  }

  return context;
}

export { HomeProvider, useHome };
