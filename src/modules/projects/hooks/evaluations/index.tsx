import React, { createContext, useContext } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys } from '@services/queryClient';

import { IEvaluations } from '@modules/projects/interfaces/IEvaluation';

import { useToast } from '@hooks/toast';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';

interface EvaluationsContextData {
  ListEvaluations(
    projectId: string,
    evaluation_type: EvaluationStageEnum
  ): UseQueryResult<IEvaluations>;
}

const EvaluationsContext = createContext<EvaluationsContextData>(
  {} as EvaluationsContextData
);

interface IEvaluationsProviderProps {
  children: React.ReactNode;
}

const EvaluationsProvider: React.FC<IEvaluationsProviderProps> = ({
  children,
}) => {
  const { addToast } = useToast();

  const ListEvaluations = (
    projectId: string,
    evaluationType: EvaluationStageEnum
  ): UseQueryResult<IEvaluations> =>
    useQuery(
      [QueryKeys.EVALUATIONS, projectId, evaluationType],
      async () => {
        const { data } = await api.get<IEvaluations>(
          `${apiRoutes.evaluations}/${projectId}`,
          {
            params: {
              evaluation_type: evaluationType,
            },
          }
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
        enabled: !!projectId && !!evaluationType,
      }
    );

  return (
    <EvaluationsContext.Provider
      value={{
        ListEvaluations,
      }}
    >
      {children}
    </EvaluationsContext.Provider>
  );
};

function useEvaluations(): EvaluationsContextData {
  const context = useContext(EvaluationsContext);

  if (!context) {
    throw new Error('useEvaluations must be used within a EvaluationsProvider');
  }

  return context;
}

export { EvaluationsProvider, useEvaluations };
