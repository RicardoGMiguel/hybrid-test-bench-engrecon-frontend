import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState } from 'react';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  IFormCreateProject,
  IFormUpdateProject,
  IProject,
  IShowProject,
} from '@modules/projects/interfaces/IProject';

import { useToast } from '@hooks/toast';
import { CreateProjectFormData } from '@modules/projects/pages/CreateProjects/createProjectForm.zod';
import { ProjectStatusEnum } from '@modules/projects/types/ProjectStatusEnum';

interface IUpdateData {
  projectId: string;
  data: IFormUpdateProject;
}

interface IUpdateProjectStatusData {
  projectId: string;
  status: ProjectStatusEnum | string;
}

interface ISendFileData {
  projectId: string;
  fileToSend: File;
}

interface ProjectContextData {
  ListProjects(): UseQueryResult<IProject[]>;
  ShowProject(id?: string): UseQueryResult<IShowProject>;
  DeleteProject: (id: string) => Promise<void>;
  SoftDeleteProject: (id: string) => Promise<void>;
  RestoreProject: (id: string) => Promise<void>;
  CreateProject: (requestData: IFormCreateProject) => Promise<{ id: string }>;
  UpdateProject: (requestData: IUpdateData) => Promise<void>;
  UpdateProjectStatus: (requestData: IUpdateProjectStatusData) => Promise<void>;
  setTempCreateProjectData: (data: CreateProjectFormData) => void;
  tempCreateProjectData: CreateProjectFormData;
  SendROISpreadsheet: (requestData: ISendFileData) => Promise<void>;
  DeleteROISpreadsheet: (projectId: string) => Promise<void>;
  SendErgonomicAep: (requestData: ISendFileData) => Promise<void>;
  DeleteErgonomicAep: (projectId: string) => Promise<void>;
  SendErgonomicAet: (requestData: ISendFileData) => Promise<void>;
  DeleteErgonomicAet: (projectId: string) => Promise<void>;
  SendElectromyography: (requestData: ISendFileData) => Promise<void>;
  DeleteElectromyography: (projectId: string) => Promise<void>;
  SendAttendanceList: (requestData: ISendFileData) => Promise<void>;
  DeleteAttendanceList: (projectId: string) => Promise<void>;
  currentStep: number;
  setCurrentStep: (data: number) => void;
  showProjectList: boolean;
  setShowProjectList: (data: boolean) => void;
  selectedCustomerId: string | undefined;
  setSelectedCustomerId: (data: string | undefined) => void;
}

const ProjectContext = createContext<ProjectContextData>(
  {} as ProjectContextData
);

interface IProjectProviderProps {
  children: React.ReactNode;
}

const ProjectProvider: React.FC<IProjectProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const [tempCreateProjectData, setTempCreateProjectData] =
    useState<CreateProjectFormData>({} as CreateProjectFormData);

  const [currentStep, setCurrentStep] = useState(1);

  const [showProjectList, setShowProjectList] = useState(false);

  const [selectedCustomerId, setSelectedCustomerId] = useState<
    string | undefined
  >(undefined);

  const ListProjects = (): UseQueryResult<IProject[]> =>
    useQuery(
      [QueryKeys.PROJECTS],
      async () => {
        const { data } = await api.get<IProject[]>(apiRoutes.projects);

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

  const ShowProject = (id?: string): UseQueryResult<IShowProject> =>
    useQuery(
      [QueryKeys.SHOW_PROJECT, id],
      async () => {
        const { data } = await api.get<IShowProject>(
          `${apiRoutes.projects}/${id}`
        );

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const DeleteProject = useMutation(
    async (id: string) => {
      const { data } = await api.delete(`${apiRoutes.projects}/${id}`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Projeto removido em definitivo com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.PROJECTS],
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

  const SoftDeleteProject = useMutation(
    async (id: string) => {
      const { data } = await api.delete(`${apiRoutes.projects}/${id}/soft`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Projeto removido com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.PROJECTS],
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

  const RestoreProject = useMutation(
    async (id: string) => {
      const { data } = await api.patch(`${apiRoutes.projects}/${id}/restore`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Projeto restaurado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.PROJECTS],
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

  const CreateProject = useMutation(
    async (formData: IFormCreateProject) => {
      const { data } = await api.post(apiRoutes.projects, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Projeto criado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.PROJECTS],
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

  const UpdateProject = useMutation(
    async (formData: IUpdateData) => {
      const { data } = await api.put(
        `${apiRoutes.projects}/${formData.projectId}`,
        formData.data
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Projeto atualizado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.PROJECTS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT],
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

  const UpdateProjectStatus = useMutation(
    async (formData: IUpdateProjectStatusData) => {
      const { data } = await api.patch(
        `${apiRoutes.projects}/${formData.projectId}/status`,
        {
          status: formData.status,
        }
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Status do projeto atualizado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.PROJECTS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT],
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

  const SendROISpreadsheet = useMutation(
    async (requestData: ISendFileData) => {
      const formData = new FormData();

      formData.append('roi_spreadsheet', requestData.fileToSend);

      const { data } = await api.patch(
        `${apiRoutes.projects}/${requestData.projectId}/roi_spreadsheet`,
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
        queryClient.invalidateQueries([QueryKeys.SHOW_PROJECT]);
        addToast({
          title: 'Arquivo salvo',
          type: 'success',
          description: 'A Planilha ROI foi enviada com sucesso',
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

  const DeleteROISpreadsheet = useMutation(
    async (projectId: string) => {
      const { data } = await api.delete(
        `${apiRoutes.projects}/${projectId}/roi_spreadsheet`
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Planilha ROI removida com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT],
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

  const SendErgonomicAep = useMutation(
    async (requestData: ISendFileData) => {
      const formData = new FormData();

      formData.append('ergonomic_evaluation_aep', requestData.fileToSend);

      const { data } = await api.patch(
        `${apiRoutes.projects}/${requestData.projectId}/ergonomic_evaluation_aep`,
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
        queryClient.invalidateQueries([QueryKeys.SHOW_PROJECT]);
        addToast({
          title: 'Arquivo salvo',
          type: 'success',
          description:
            'A Avaliação Ergonômica Preliminar foi enviada com sucesso',
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

  const DeleteErgonomicAep = useMutation(
    async (projectId: string) => {
      const { data } = await api.delete(
        `${apiRoutes.projects}/${projectId}/ergonomic_evaluation_aep`
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Avaliação Ergonômica Preliminar removida com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT],
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

  const SendErgonomicAet = useMutation(
    async (requestData: ISendFileData) => {
      const formData = new FormData();

      formData.append('ergonomic_evaluation_aet', requestData.fileToSend);

      const { data } = await api.patch(
        `${apiRoutes.projects}/${requestData.projectId}/ergonomic_evaluation_aet`,
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
        queryClient.invalidateQueries([QueryKeys.SHOW_PROJECT]);
        addToast({
          title: 'Arquivo salvo',
          type: 'success',
          description:
            'A Avaliação Ergonômica do Trabalho foi enviada com sucesso',
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

  const DeleteErgonomicAet = useMutation(
    async (projectId: string) => {
      const { data } = await api.delete(
        `${apiRoutes.projects}/${projectId}/ergonomic_evaluation_aet`
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Avaliação Ergonômica do Trabalho removida com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT],
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

  const SendElectromyography = useMutation(
    async (requestData: ISendFileData) => {
      const formData = new FormData();

      formData.append('electromyography', requestData.fileToSend);

      const { data } = await api.patch(
        `${apiRoutes.projects}/${requestData.projectId}/electromyography`,
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
        queryClient.invalidateQueries([QueryKeys.SHOW_PROJECT]);
        addToast({
          title: 'Arquivo salvo',
          type: 'success',
          description: 'A Eletromiografia foi enviada com sucesso',
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

  const DeleteElectromyography = useMutation(
    async (projectId: string) => {
      const { data } = await api.delete(
        `${apiRoutes.projects}/${projectId}/electromyography`
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Eletromiografia removida com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT],
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

  const SendAttendanceList = useMutation(
    async (requestData: ISendFileData) => {
      const formData = new FormData();

      formData.append('attendance_list', requestData.fileToSend);

      const { data } = await api.patch(
        `${apiRoutes.projects}/${requestData.projectId}/attendance_list`,
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
        queryClient.invalidateQueries([QueryKeys.SHOW_PROJECT]);
        addToast({
          title: 'Arquivo salvo',
          type: 'success',
          description: 'A Lista de presença foi enviada com sucesso',
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

  const DeleteAttendanceList = useMutation(
    async (projectId: string) => {
      const { data } = await api.delete(
        `${apiRoutes.projects}/${projectId}/attendance_list`
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Lista de presença removida com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_PROJECT],
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
    <ProjectContext.Provider
      value={{
        ListProjects,
        ShowProject,
        DeleteProject,
        SoftDeleteProject,
        RestoreProject,
        CreateProject,
        UpdateProject,
        UpdateProjectStatus,
        setTempCreateProjectData,
        tempCreateProjectData,
        SendROISpreadsheet,
        DeleteROISpreadsheet,
        SendErgonomicAep,
        DeleteErgonomicAep,
        SendErgonomicAet,
        DeleteErgonomicAet,
        SendElectromyography,
        DeleteElectromyography,
        SendAttendanceList,
        DeleteAttendanceList,
        currentStep,
        setCurrentStep,
        showProjectList,
        setShowProjectList,
        selectedCustomerId,
        setSelectedCustomerId,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

function useProject(): ProjectContextData {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }

  return context;
}

export { ProjectProvider, useProject };
