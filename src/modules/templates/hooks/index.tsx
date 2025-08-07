import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import { useToast } from '@hooks/toast';
import { ITemplate } from '../interfaces/ITemplate';
import { ScreenNameEnum } from '../types/ScreenNameEnum';

interface IUpdateData {
  templateId: string;
  fileToSend: File;
}

interface TemplateContextData {
  ListTemplates(): UseQueryResult<ITemplate[]>;
  ShowTemplateByScreen(screenName?: ScreenNameEnum): UseQueryResult<ITemplate>;
  UpdateTemplate: (requestData: IUpdateData) => Promise<void>;
}

const TemplateContext = createContext<TemplateContextData>(
  {} as TemplateContextData
);

interface ITemplateProviderProps {
  children: React.ReactNode;
}

const TemplateProvider: React.FC<ITemplateProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const ListTemplates = (): UseQueryResult<ITemplate[]> =>
    useQuery(
      [QueryKeys.TEMPLATES],
      async () => {
        const { data } = await api.get<ITemplate[]>(apiRoutes.file_templates);

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

  const ShowTemplateByScreen = (
    screenName?: ScreenNameEnum
  ): UseQueryResult<ITemplate> =>
    useQuery(
      [QueryKeys.SHOW_EQUIPMENT, screenName],
      async () => {
        const { data } = await api.get<ITemplate>(
          `${apiRoutes.file_templates}/screen_name/${screenName}`
        );

        return data;
      },
      {
        enabled: !!screenName,
      }
    );

  const UpdateTemplate = useMutation(
    async (requestData: IUpdateData) => {
      const formData = new FormData();

      formData.append('file_template', requestData.fileToSend);

      const { data } = await api.put(
        `${apiRoutes.file_templates}/${requestData.templateId}`,
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
        queryClient.invalidateQueries([QueryKeys.TEMPLATES]);
        addToast({
          title: 'Arquivo salvo',
          type: 'success',
          description: 'O arquivo do template foi atualizado com sucesso',
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
    <TemplateContext.Provider
      value={{
        ListTemplates,
        ShowTemplateByScreen,
        UpdateTemplate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

function useTemplate(): TemplateContextData {
  const context = useContext(TemplateContext);

  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }

  return context;
}

export { TemplateProvider, useTemplate };
