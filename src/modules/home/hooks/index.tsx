import React, { createContext, useContext } from 'react';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';

import { IFormSendCommand } from '@modules/home/interfaces/IFormSendCommand';

import { useToast } from '@hooks/toast';
import { QueryKeys } from '@services/queryClient';
import { IReportsChartData } from '../interfaces/IReportsChartData';

interface HomeContextData {
  SendCommand: (requestData: IFormSendCommand) => Promise<void>;
  GetReportChartData(): UseQueryResult<IReportsChartData>;
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
    <HomeContext.Provider
      value={{
        SendCommand,
        GetReportChartData,
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
