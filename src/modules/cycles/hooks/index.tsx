import React, { createContext, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';

import { IFormSendCycleCommand } from '@modules/cycles/interfaces/IFormSendCycleCommand';

import { useToast } from '@hooks/toast';

interface CycleContextData {
  SendCycleCommand: (requestData: IFormSendCycleCommand) => Promise<void>;
}

const CycleContext = createContext<CycleContextData>({} as CycleContextData);

interface ICycleProviderProps {
  children: React.ReactNode;
}

const CycleProvider: React.FC<ICycleProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const SendCycleCommand = useMutation(
    async (formData: IFormSendCycleCommand) => {
      const { data } = await api.post(apiRoutes.serialCycleCommand, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Comandos de ciclo enviados com sucesso',
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
    <CycleContext.Provider
      value={{
        SendCycleCommand,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

function useCycle(): CycleContextData {
  const context = useContext(CycleContext);

  if (!context) {
    throw new Error('useCycle must be used within a CycleProvider');
  }

  return context;
}

export { CycleProvider, useCycle };
