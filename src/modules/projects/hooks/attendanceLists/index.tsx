import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  IAttendanceList,
  IFormUpdateAttendanceList,
} from '@modules/projects/interfaces/IAttendanceLists';

import { useToast } from '@hooks/toast';

interface IUpdateData {
  projectId: string;
  data: IFormUpdateAttendanceList;
}

interface AttendanceListContextData {
  ListAttendanceList(projectId: string): UseQueryResult<IAttendanceList>;
  UpdateAttendanceList: (requestData: IUpdateData) => Promise<void>;
}

const AttendanceListContext = createContext<AttendanceListContextData>(
  {} as AttendanceListContextData
);

interface IAttendanceListProviderProps {
  children: React.ReactNode;
}

const AttendanceListProvider: React.FC<IAttendanceListProviderProps> = ({
  children,
}) => {
  const { addToast } = useToast();

  const ListAttendanceList = (
    projectId: string
  ): UseQueryResult<IAttendanceList> =>
    useQuery(
      [QueryKeys.ATTENDANCE_LIST],
      async () => {
        const { data } = await api.get<IAttendanceList>(
          `${apiRoutes.attendance_lists}/${projectId}`
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

  const UpdateAttendanceList = useMutation(
    async (formData: IUpdateData) => {
      const { data } = await api.put(
        `${apiRoutes.attendance_lists}/${formData.projectId}`,
        formData.data
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Lista de presença atualizada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.ATTENDANCE_LIST],
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
    <AttendanceListContext.Provider
      value={{
        ListAttendanceList,
        UpdateAttendanceList,
      }}
    >
      {children}
    </AttendanceListContext.Provider>
  );
};

function useAttendanceList(): AttendanceListContextData {
  const context = useContext(AttendanceListContext);

  if (!context) {
    throw new Error(
      'useAttendanceList must be used within a AttendanceListProvider'
    );
  }

  return context;
}

export { AttendanceListProvider, useAttendanceList };
