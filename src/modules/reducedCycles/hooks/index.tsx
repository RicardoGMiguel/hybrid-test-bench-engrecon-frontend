import React, { createContext, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';

import { IFormSendCycleCommand } from '@modules/cycles/interfaces/IFormSendCycleCommand';

import { useToast } from '@hooks/toast';

interface SerialCycleContextData {
  SendSerialCycleCommand: (requestData: IFormSendCycleCommand) => Promise<void>;
}

const SerialCycleContext = createContext<SerialCycleContextData>(
  {} as SerialCycleContextData
);

interface ISerialCycleProviderProps {
  children: React.ReactNode;
}

const SerialCycleProvider: React.FC<ISerialCycleProviderProps> = ({
  children,
}) => {
  const { addToast } = useToast();

  const SendSerialCycleCommand = useMutation(
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
    <SerialCycleContext.Provider
      value={{
        SendSerialCycleCommand,
      }}
    >
      {children}
    </SerialCycleContext.Provider>
  );
};

function useSerialCycle(): SerialCycleContextData {
  const context = useContext(SerialCycleContext);

  if (!context) {
    throw new Error('useSerialCycle must be used within a SerialCycleProvider');
  }

  return context;
}

export { SerialCycleProvider, useSerialCycle };
