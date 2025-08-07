import React, { createContext, useContext } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys } from '@services/queryClient';

import { useToast } from '@hooks/toast';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { IAutoEvaluationReport } from '@modules/projects/interfaces/IAutoEvaluationReport';
import { IKinesisEvaluationReport } from '@modules/projects/interfaces/IKinesisEvaluationReport';
import { ISensorsReport } from '@modules/projects/interfaces/ISensorsReport';

interface ReportsContextData {
  ListAutoEvaluationsReport(
    projectId: string,
    currentEvaluationType: EvaluationStageEnum | string,
    prevEvaluationType?: EvaluationStageEnum | string
  ): UseQueryResult<IAutoEvaluationReport>;
  ListKinesisEvaluationsReport(
    projectId: string,
    currentEvaluationType: EvaluationStageEnum | string,
    prevEvaluationType?: EvaluationStageEnum | string
  ): UseQueryResult<IKinesisEvaluationReport>;
  ListSensorsReport(
    projectId: string,
    currentEvaluationType: EvaluationStageEnum | string,
    prevEvaluationType?: EvaluationStageEnum | string
  ): UseQueryResult<ISensorsReport>;
}

const ReportsContext = createContext<ReportsContextData>(
  {} as ReportsContextData
);

interface IReportsProviderProps {
  children: React.ReactNode;
}

const ReportsProvider: React.FC<IReportsProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const ListAutoEvaluationsReport = (
    projectId: string,
    currentEvaluationType: EvaluationStageEnum,
    prevEvaluationType?: EvaluationStageEnum
  ): UseQueryResult<IAutoEvaluationReport> =>
    useQuery(
      [
        QueryKeys.AUTO_EVALUATIONS_REPORT,
        projectId,
        currentEvaluationType,
        prevEvaluationType,
      ],
      async () => {
        const { data } = await api.get<IAutoEvaluationReport>(
          `${apiRoutes.reports}/${projectId}/auto_evaluation`,
          {
            params: {
              current_evaluation_type: currentEvaluationType,
              prev_evaluation_type: prevEvaluationType,
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
        enabled: !!projectId && !!currentEvaluationType,
      }
    );

  const ListKinesisEvaluationsReport = (
    projectId: string,
    currentEvaluationType: EvaluationStageEnum,
    prevEvaluationType?: EvaluationStageEnum
  ): UseQueryResult<IKinesisEvaluationReport> =>
    useQuery(
      [
        QueryKeys.KINESIS_EVALUATIONS_REPORT,
        projectId,
        currentEvaluationType,
        prevEvaluationType,
      ],
      async () => {
        const { data } = await api.get<IKinesisEvaluationReport>(
          `${apiRoutes.reports}/${projectId}/kinesis_functional_evaluation`,
          {
            params: {
              current_evaluation_type: currentEvaluationType,
              prev_evaluation_type: prevEvaluationType,
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
        enabled: !!projectId && !!currentEvaluationType,
      }
    );

  const ListSensorsReport = (
    projectId: string,
    currentEvaluationType: EvaluationStageEnum,
    prevEvaluationType?: EvaluationStageEnum
  ): UseQueryResult<ISensorsReport> =>
    useQuery(
      [
        QueryKeys.SENSORS_REPORT,
        projectId,
        currentEvaluationType,
        prevEvaluationType,
      ],
      async () => {
        const { data } = await api.get<ISensorsReport>(
          `${apiRoutes.reports}/${projectId}/sensors`,
          {
            params: {
              current_evaluation_type: currentEvaluationType,
              prev_evaluation_type: prevEvaluationType,
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
        enabled: !!projectId && !!currentEvaluationType,
      }
    );

  return (
    <ReportsContext.Provider
      value={{
        ListAutoEvaluationsReport,
        ListKinesisEvaluationsReport,
        ListSensorsReport,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

function useReports(): ReportsContextData {
  const context = useContext(ReportsContext);

  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }

  return context;
}

export { ReportsProvider, useReports };
