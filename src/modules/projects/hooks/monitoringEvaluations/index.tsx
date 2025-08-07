import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  IMonitoringEvaluation,
  IFormCreateMonitoringEvaluation,
  IFormUpdateMonitoringEvaluation,
} from '@modules/projects/interfaces/IMonitoringEvaluation';

import { useToast } from '@hooks/toast';

interface IUpdateData {
  monitoringEvaluationId: string;
  data: IFormUpdateMonitoringEvaluation;
}

interface MonitoringEvaluationContextData {
  ListMonitoringEvaluations(): UseQueryResult<IMonitoringEvaluation[]>;
  ShowMonitoringEvaluation(id: string): UseQueryResult<IMonitoringEvaluation>;
  DeleteMonitoringEvaluation: (id: string) => Promise<void>;
  CreateMonitoringEvaluation: (
    requestData: IFormCreateMonitoringEvaluation
  ) => Promise<void>;
  UpdateMonitoringEvaluation: (requestData: IUpdateData) => Promise<void>;
}

const MonitoringEvaluationContext =
  createContext<MonitoringEvaluationContextData>(
    {} as MonitoringEvaluationContextData
  );

interface IMonitoringEvaluationProviderProps {
  children: React.ReactNode;
}

const MonitoringEvaluationProvider: React.FC<
  IMonitoringEvaluationProviderProps
> = ({ children }) => {
  const { addToast } = useToast();

  const ListMonitoringEvaluations = (): UseQueryResult<
    IMonitoringEvaluation[]
  > =>
    useQuery(
      [QueryKeys.MONITORING_EVALUATIONS],
      async () => {
        const { data } = await api.get<IMonitoringEvaluation[]>(
          apiRoutes.monitoring_evaluations
        );

        return data;
      },
      {
        onError: (error) => {
          errorHandler({
            error,
            addToast,
            title: 'Ocorreu um erro!',
          });
        },
      }
    );

  const ShowMonitoringEvaluation = (
    id?: string
  ): UseQueryResult<IMonitoringEvaluation> =>
    useQuery(
      [QueryKeys.SHOW_MONITORING_EVALUATION, id],
      async () => {
        const { data } = await api.get<IMonitoringEvaluation>(
          `${apiRoutes.monitoring_evaluations}/${id}`
        );

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const DeleteMonitoringEvaluation = useMutation(
    async (id: string) => {
      const { data } = await api.delete(
        `${apiRoutes.monitoring_evaluations}/${id}`
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Avaliação de Monitoramento removida com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.MONITORING_EVALUATIONS],
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

  const CreateMonitoringEvaluation = useMutation(
    async (requestData: IFormCreateMonitoringEvaluation) => {
      const { data } = await api.post(
        `${apiRoutes.monitoring_evaluations}`,
        requestData
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Avaliação de Monitoramento criada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.MONITORING_EVALUATIONS],
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

  const UpdateMonitoringEvaluation = useMutation(
    async (requestData: IUpdateData) => {
      const { data } = await api.put(
        `${apiRoutes.monitoring_evaluations}/${requestData.monitoringEvaluationId}`,
        requestData.data
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Avaliação de Monitoramento atualizada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.MONITORING_EVALUATIONS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_MONITORING_EVALUATION],
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
    <MonitoringEvaluationContext.Provider
      value={{
        ListMonitoringEvaluations,
        ShowMonitoringEvaluation,
        DeleteMonitoringEvaluation,
        CreateMonitoringEvaluation,
        UpdateMonitoringEvaluation,
      }}
    >
      {children}
    </MonitoringEvaluationContext.Provider>
  );
};

function useMonitoringEvaluation(): MonitoringEvaluationContextData {
  const context = useContext(MonitoringEvaluationContext);

  if (!context) {
    throw new Error(
      'useMonitoringEvaluation must be used within a MonitoringEvaluationProvider'
    );
  }

  return context;
}

export { MonitoringEvaluationProvider, useMonitoringEvaluation };
