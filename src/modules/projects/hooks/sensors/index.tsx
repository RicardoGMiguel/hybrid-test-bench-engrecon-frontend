import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  ISensor,
  IFormCreateSensor,
  IFormUpdateSensor,
} from '@modules/projects/interfaces/ISensor';

import { useToast } from '@hooks/toast';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';

interface IUpdateData {
  sensorId: string;
  data: IFormUpdateSensor;
}

interface ISendFileData {
  sensorId: string;
  fileToSend: File;
}

export interface IListSensors {
  exy: ISensor[];
  other: ISensor[];
}

interface SensorContextData {
  ListSensors(
    projectId: string,
    evaluationType: EvaluationStageEnum | string
  ): UseQueryResult<IListSensors>;
  ShowSensor(id?: string): UseQueryResult<ISensor>;
  DeleteSensor: (id: string) => Promise<void>;
  CreateSensor: (requestData: IFormCreateSensor) => Promise<void>;
  UpdateSensor: (requestData: IUpdateData) => Promise<void>;
  SendSensorData: (requestData: ISendFileData) => Promise<void>;
}

const SensorContext = createContext<SensorContextData>({} as SensorContextData);

interface ISensorProviderProps {
  children: React.ReactNode;
}

const SensorProvider: React.FC<ISensorProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const ListSensors = (
    projectId: string,
    evaluationType: EvaluationStageEnum | string
  ): UseQueryResult<IListSensors> =>
    useQuery(
      [QueryKeys.SENSORS],
      async () => {
        const { data } = await api.get<IListSensors>(apiRoutes.sensors, {
          params: {
            project_id: projectId,
            evaluation_type: evaluationType,
          },
        });

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

  const ShowSensor = (id?: string): UseQueryResult<ISensor> =>
    useQuery(
      [QueryKeys.SHOW_SENSOR, id],
      async () => {
        const { data } = await api.get<ISensor>(`${apiRoutes.sensors}/${id}`);

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const DeleteSensor = useMutation(
    async (id: string) => {
      const { data } = await api.delete(`${apiRoutes.sensors}/${id}`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Sensor removido com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SENSORS],
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

  const CreateSensor = useMutation(
    async (formData: IFormCreateSensor) => {
      const { data } = await api.post(apiRoutes.sensors, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Sensor criado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SENSORS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_SENSOR],
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

  const UpdateSensor = useMutation(
    async (formData: IUpdateData) => {
      const { data } = await api.put(
        `${apiRoutes.sensors}/${formData.sensorId}`,
        formData.data
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Sensor atualizado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SENSORS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_SENSOR],
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

  const SendSensorData = useMutation(
    async (requestData: ISendFileData) => {
      const formData = new FormData();

      formData.append('sensor_data', requestData.fileToSend);

      const { data } = await api.post(
        `${apiRoutes.sensors}/${requestData.sensorId}/data`,
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
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.SENSORS]);

        queryClient.invalidateQueries([QueryKeys.SHOW_SENSOR]);

        queryClient.invalidateQueries([QueryKeys.EVALUATIONS]);

        addToast({
          title: 'Arquivo salvo',
          type: 'success',
          description: 'O arquivo de dados do sensor foi enviado com sucesso',
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
    <SensorContext.Provider
      value={{
        ListSensors,
        ShowSensor,
        DeleteSensor,
        CreateSensor,
        UpdateSensor,
        SendSensorData,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};

function useSensor(): SensorContextData {
  const context = useContext(SensorContext);

  if (!context) {
    throw new Error('useSensor must be used within a SensorProvider');
  }

  return context;
}

export { SensorProvider, useSensor };
