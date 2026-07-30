import React, { createContext, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';

import { IFormSendCarlaCommand } from '@modules/carla/interfaces/IFormSendCarlaCommand';

import { useToast } from '@hooks/toast';

interface CarlaContextData {
  SendCarlaCommand: (requestData: IFormSendCarlaCommand) => Promise<void>;
}

const CarlaContext = createContext<CarlaContextData>({} as CarlaContextData);

interface ICarlaProviderProps {
  children: React.ReactNode;
}

const CarlaProvider: React.FC<ICarlaProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const SendCarlaCommand = useMutation(
    async (formData: IFormSendCarlaCommand) => {
      const { data } = await api.post(apiRoutes.opcuaCarlaCommand, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Comandos CARLA enviados com sucesso',
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
    <CarlaContext.Provider
      value={{
        SendCarlaCommand,
      }}
    >
      {children}
    </CarlaContext.Provider>
  );
};

function useCarla(): CarlaContextData {
  const context = useContext(CarlaContext);

  if (!context) {
    throw new Error('useCarla must be used within a CarlaProvider');
  }

  return context;
}

export { CarlaProvider, useCarla };
