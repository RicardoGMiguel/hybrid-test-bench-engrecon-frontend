import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  IKinesisEvaluation,
  IFormCreateKinesisEvaluation,
  IFormUpdateKinesisEvaluation,
} from '@modules/projects/interfaces/IKinesisEvaluation';

import { useToast } from '@hooks/toast';

interface ICreateData {
  data: IFormCreateKinesisEvaluation;
  fileToSend: File;
}

interface IUpdateData {
  kinesisEvaluationId: string;
  data: IFormUpdateKinesisEvaluation;
  fileToSend?: File;
}

interface KinesisEvaluationContextData {
  ListKinesisEvaluations(): UseQueryResult<IKinesisEvaluation[]>;
  ShowKinesisEvaluation(id?: string): UseQueryResult<IKinesisEvaluation>;
  DeleteKinesisEvaluation: (id: string) => Promise<void>;
  CreateKinesisEvaluation: (requestData: ICreateData) => Promise<void>;
  UpdateKinesisEvaluation: (requestData: IUpdateData) => Promise<void>;
}

const KinesisEvaluationContext = createContext<KinesisEvaluationContextData>(
  {} as KinesisEvaluationContextData
);

interface IKinesisEvaluationProviderProps {
  children: React.ReactNode;
}

const KinesisEvaluationProvider: React.FC<IKinesisEvaluationProviderProps> = ({
  children,
}) => {
  const { addToast } = useToast();

  const ListKinesisEvaluations = (): UseQueryResult<IKinesisEvaluation[]> =>
    useQuery(
      [QueryKeys.KINESIS_EVALUATIONS],
      async () => {
        const { data } = await api.get<IKinesisEvaluation[]>(
          apiRoutes.kinesis_functional_evaluations
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

  const ShowKinesisEvaluation = (
    id?: string
  ): UseQueryResult<IKinesisEvaluation> =>
    useQuery(
      [QueryKeys.SHOW_KINESIS_EVALUATION, id],
      async () => {
        const { data } = await api.get<IKinesisEvaluation>(
          `${apiRoutes.kinesis_functional_evaluations}/${id}`
        );

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const DeleteKinesisEvaluation = useMutation(
    async (id: string) => {
      const { data } = await api.delete(
        `${apiRoutes.kinesis_functional_evaluations}/${id}`
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Avaliação Cinésio Funcional removida com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.KINESIS_EVALUATIONS],
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

  const CreateKinesisEvaluation = useMutation(
    async (requestData: ICreateData) => {
      const formData = new FormData();

      formData.append(
        'kinesis_functional_evaluation_file',
        requestData.fileToSend
      );

      Object.entries(requestData.data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await api.post(
        `${apiRoutes.kinesis_functional_evaluations}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Avaliação Cinésio Funcional criada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.KINESIS_EVALUATIONS],
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

  const UpdateKinesisEvaluation = useMutation(
    async (requestData: IUpdateData) => {
      const formData = new FormData();

      if (requestData.fileToSend) {
        formData.append(
          'kinesis_functional_evaluation_file',
          requestData.fileToSend
        );
      }

      Object.entries(requestData.data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await api.put(
        `${apiRoutes.kinesis_functional_evaluations}/${requestData.kinesisEvaluationId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Avaliação Cinésio Funcional atualizada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.KINESIS_EVALUATIONS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_KINESIS_EVALUATION],
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
    <KinesisEvaluationContext.Provider
      value={{
        ListKinesisEvaluations,
        ShowKinesisEvaluation,
        DeleteKinesisEvaluation,
        CreateKinesisEvaluation,
        UpdateKinesisEvaluation,
      }}
    >
      {children}
    </KinesisEvaluationContext.Provider>
  );
};

function useKinesisEvaluation(): KinesisEvaluationContextData {
  const context = useContext(KinesisEvaluationContext);

  if (!context) {
    throw new Error(
      'useKinesisEvaluation must be used within a KinesisEvaluationProvider'
    );
  }

  return context;
}

export { KinesisEvaluationProvider, useKinesisEvaluation };
