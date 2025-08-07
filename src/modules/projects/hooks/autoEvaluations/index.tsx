import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  IAutoEvaluation,
  IFormCreateAutoEvaluation,
  IFormUpdateAutoEvaluation,
} from '@modules/projects/interfaces/IAutoEvaluation';

import { useToast } from '@hooks/toast';

interface IUpdateData {
  autoEvaluationId: string;
  data: IFormUpdateAutoEvaluation;
}

interface AutoEvaluationContextData {
  ListAutoEvaluations(): UseQueryResult<IAutoEvaluation[]>;
  ShowAutoEvaluation(id?: string): UseQueryResult<IAutoEvaluation>;
  DeleteAutoEvaluation: (id: string) => Promise<void>;
  CreateAutoEvaluation: (
    requestData: IFormCreateAutoEvaluation
  ) => Promise<void>;
  UpdateAutoEvaluation: (requestData: IUpdateData) => Promise<void>;
}

const AutoEvaluationContext = createContext<AutoEvaluationContextData>(
  {} as AutoEvaluationContextData
);

interface IAutoEvaluationProviderProps {
  children: React.ReactNode;
}

const AutoEvaluationProvider: React.FC<IAutoEvaluationProviderProps> = ({
  children,
}) => {
  const { addToast } = useToast();

  const ListAutoEvaluations = (): UseQueryResult<IAutoEvaluation[]> =>
    useQuery(
      [QueryKeys.AUTO_EVALUATIONS],
      async () => {
        const { data } = await api.get<IAutoEvaluation[]>(
          apiRoutes.auto_evaluations
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

  const ShowAutoEvaluation = (id?: string): UseQueryResult<IAutoEvaluation> =>
    useQuery(
      [QueryKeys.SHOW_AUTO_EVALUATION, id],
      async () => {
        const { data } = await api.get<IAutoEvaluation>(
          `${apiRoutes.auto_evaluations}/${id}`
        );

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const DeleteAutoEvaluation = useMutation(
    async (id: string) => {
      const { data } = await api.delete(`${apiRoutes.auto_evaluations}/${id}`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Autoavaliação removida com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.AUTO_EVALUATIONS],
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

  const CreateAutoEvaluation = useMutation(
    async (formData: IFormCreateAutoEvaluation) => {
      const { data } = await api.post(apiRoutes.auto_evaluations, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Autoavaliação criada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.AUTO_EVALUATIONS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.EVALUATIONS],
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

  const UpdateAutoEvaluation = useMutation(
    async (formData: IUpdateData) => {
      const { data } = await api.put(
        `${apiRoutes.auto_evaluations}/${formData.autoEvaluationId}`,
        formData.data
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Autoavaliação atualizada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.AUTO_EVALUATIONS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_AUTO_EVALUATION],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.EVALUATIONS],
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
    <AutoEvaluationContext.Provider
      value={{
        ListAutoEvaluations,
        ShowAutoEvaluation,
        DeleteAutoEvaluation,
        CreateAutoEvaluation,
        UpdateAutoEvaluation,
      }}
    >
      {children}
    </AutoEvaluationContext.Provider>
  );
};

function useAutoEvaluation(): AutoEvaluationContextData {
  const context = useContext(AutoEvaluationContext);

  if (!context) {
    throw new Error(
      'useAutoEvaluation must be used within a AutoEvaluationProvider'
    );
  }

  return context;
}

export { AutoEvaluationProvider, useAutoEvaluation };
