import React, { createContext, useContext } from 'react';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';

import { IFormSendCommand } from '@modules/home/interfaces/IFormSendCommand';

import { useToast } from '@hooks/toast';
import { QueryKeys } from '@services/queryClient';
import { IReportsChartData } from '../interfaces/IReportsChartData';

interface SerialHomeContextData {
  SendSerialCommand: (requestData: IFormSendCommand) => Promise<void>;
  GetReportChartData(): UseQueryResult<IReportsChartData>;
}

const SerialHomeContext = createContext<SerialHomeContextData>(
  {} as SerialHomeContextData
);

interface ISerialHomeProviderProps {
  children: React.ReactNode;
}

const SerialHomeProvider: React.FC<ISerialHomeProviderProps> = ({
  children,
}) => {
  const { addToast } = useToast();

  const SendSerialCommand = useMutation(
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

  const GetReportChartData = (): UseQueryResult<IReportsChartData> =>
    useQuery(
      [QueryKeys.REPORTS_CHART_DATA],
      async () => {
        const { data } = await api.get<IReportsChartData>(
          apiRoutes.reportsChart
        );

        return data;
      },
      {
        onError: (error: any) => {
          errorHandler({
            error,
            addToast,
            title: 'Ocorreu um erro!',
          });
        },
      }
    );

  return (
    <SerialHomeContext.Provider
      value={{
        SendSerialCommand,
        GetReportChartData,
      }}
    >
      {children}
    </SerialHomeContext.Provider>
  );
};

function useSerialHome(): SerialHomeContextData {
  const context = useContext(SerialHomeContext);

  if (!context) {
    throw new Error('useSerialHome must be used within a SerialHomeProvider');
  }

  return context;
}

export { SerialHomeProvider, useSerialHome };
