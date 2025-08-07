import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  IEquipment,
  IFormCreateEquipment,
  IFormUpdateEquipment,
} from '@modules/equipments/interfaces/IEquipment';

import { useToast } from '@hooks/toast';

interface IUpdateData {
  equipmentId: string;
  data: IFormUpdateEquipment;
}

interface EquipmentContextData {
  ListEquipments(customerId?: string): UseQueryResult<IEquipment[]>;
  ShowEquipment(id?: string): UseQueryResult<IEquipment>;
  DeleteEquipment: (id: string) => Promise<void>;
  CreateEquipment: (requestData: IFormCreateEquipment) => Promise<void>;
  UpdateEquipment: (requestData: IUpdateData) => Promise<void>;
}

const EquipmentContext = createContext<EquipmentContextData>(
  {} as EquipmentContextData
);

interface IEquipmentProviderProps {
  children: React.ReactNode;
}

const EquipmentProvider: React.FC<IEquipmentProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const ListEquipments = (customerId?: string): UseQueryResult<IEquipment[]> =>
    useQuery(
      [QueryKeys.EQUIPMENTS, customerId],
      async () => {
        const { data } = await api.get<IEquipment[]>(apiRoutes.equipments, {
          params: {
            customer_id: customerId,
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

  const ShowEquipment = (id?: string): UseQueryResult<IEquipment> =>
    useQuery(
      [QueryKeys.SHOW_EQUIPMENT, id],
      async () => {
        const { data } = await api.get<IEquipment>(
          `${apiRoutes.equipments}/${id}`
        );

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const DeleteEquipment = useMutation(
    async (id: string) => {
      const { data } = await api.delete(`${apiRoutes.equipments}/${id}`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Equipamento removido com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.EQUIPMENTS],
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

  const CreateEquipment = useMutation(
    async (formData: IFormCreateEquipment) => {
      const { data } = await api.post(apiRoutes.equipments, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Equipamento criado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.EQUIPMENTS],
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

  const UpdateEquipment = useMutation(
    async (formData: IUpdateData) => {
      const { data } = await api.put(
        `${apiRoutes.equipments}/${formData.equipmentId}`,
        formData.data
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Equipamento atualizado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.EQUIPMENTS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_EQUIPMENT],
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
    <EquipmentContext.Provider
      value={{
        ListEquipments,
        ShowEquipment,
        DeleteEquipment,
        CreateEquipment,
        UpdateEquipment,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

function useEquipment(): EquipmentContextData {
  const context = useContext(EquipmentContext);

  if (!context) {
    throw new Error('useEquipment must be used within a EquipmentProvider');
  }

  return context;
}

export { EquipmentProvider, useEquipment };
