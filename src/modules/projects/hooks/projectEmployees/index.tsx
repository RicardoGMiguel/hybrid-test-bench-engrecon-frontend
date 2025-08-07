import React, { createContext, useContext, useState } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  IFormCreateProjectEmployee,
  IProjectEmployee,
} from '@modules/projects/interfaces/IProjectEmployee';

import { useToast } from '@hooks/toast';
import { CreateProjectEmployeeFormData } from '@modules/projects/pages/CreateProjectEmployees/createProjectEmployeeForm.zod';
import { EditProjectEmployeeFormData } from '@modules/projects/pages/EditProjectEmployees/editProjectEmployeeForm.zod';

interface ProjectEmployeeContextData {
  ShowProjectEmployees(id: string): UseQueryResult<IProjectEmployee[]>;
  CreateProjectEmployee: (
    requestData: IFormCreateProjectEmployee
  ) => Promise<void>;
  UpdateProjectEmployee: (
    requestData: IFormCreateProjectEmployee
  ) => Promise<void>;
  DeleteProjectEmployee: (id: string) => Promise<void>;
  setTempCreateProjectEmployees: (data: CreateProjectEmployeeFormData) => void;
  tempCreateProjectEmployees: CreateProjectEmployeeFormData;
  setTempEditProjectEmployee: (data: EditProjectEmployeeFormData) => void;
  tempEditProjectEmployee: EditProjectEmployeeFormData;
}

const ProjectEmployeeContext = createContext<ProjectEmployeeContextData>(
  {} as ProjectEmployeeContextData
);

interface IProjectEmployeeProviderProps {
  children: React.ReactNode;
}

const ProjectEmployeeProvider: React.FC<IProjectEmployeeProviderProps> = ({
  children,
}) => {
  const { addToast } = useToast();

  const [tempCreateProjectEmployees, setTempCreateProjectEmployees] =
    useState<CreateProjectEmployeeFormData>(
      {} as CreateProjectEmployeeFormData
    );

  const [tempEditProjectEmployee, setTempEditProjectEmployee] =
    useState<EditProjectEmployeeFormData>({} as EditProjectEmployeeFormData);

  const ShowProjectEmployees = (
    id: string
  ): UseQueryResult<IProjectEmployee[]> =>
    useQuery(
      [QueryKeys.SHOW_PROJECT_EMPLOYEES, id],
      async () => {
        const { data } = await api.get<IProjectEmployee[]>(
          `${apiRoutes.project_employees}/${id}`
        );

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const CreateProjectEmployee = useMutation(
    async (formData: IFormCreateProjectEmployee) => {
      const { data } = await api.post(apiRoutes.project_employees, formData);

      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT_EMPLOYEES],
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

  const UpdateProjectEmployee = useMutation(
    async (formData: IFormCreateProjectEmployee) => {
      const { data } = await api.put(apiRoutes.project_employees, formData);

      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT_EMPLOYEES],
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

  const DeleteProjectEmployee = useMutation(
    async (id: string) => {
      const { data } = await api.delete(`${apiRoutes.project_employees}/${id}`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Colaborador removido do projeto com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT_EMPLOYEES],
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
    <ProjectEmployeeContext.Provider
      value={{
        ShowProjectEmployees,
        CreateProjectEmployee,
        UpdateProjectEmployee,
        DeleteProjectEmployee,
        setTempCreateProjectEmployees,
        tempCreateProjectEmployees,
        setTempEditProjectEmployee,
        tempEditProjectEmployee,
      }}
    >
      {children}
    </ProjectEmployeeContext.Provider>
  );
};

function useProjectEmployee(): ProjectEmployeeContextData {
  const context = useContext(ProjectEmployeeContext);

  if (!context) {
    throw new Error(
      'useProjectEmployee must be used within a ProjectEmployeeProvider'
    );
  }

  return context;
}

export { ProjectEmployeeProvider, useProjectEmployee };
