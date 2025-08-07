import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  ICustomer,
  IFormCreateCustomer,
  IFormUpdateCustomer,
} from '@modules/customers/interfaces/ICustomer';

import { useToast } from '@hooks/toast';

interface IUpdateData {
  customerId: string;
  data: IFormUpdateCustomer;
}

interface CustomerContextData {
  ListCustomers(disable?: boolean): UseQueryResult<ICustomer[]>;
  ShowCustomer(id?: string): UseQueryResult<ICustomer>;
  DeleteCustomer: (id: string) => Promise<void>;
  CreateCustomer: (requestData: IFormCreateCustomer) => Promise<void>;
  UpdateCustomer: (requestData: IUpdateData) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextData>(
  {} as CustomerContextData
);

interface ICustomerProviderProps {
  children: React.ReactNode;
}

const CustomerProvider: React.FC<ICustomerProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const ListCustomers = (disable?: boolean): UseQueryResult<ICustomer[]> =>
    useQuery(
      [QueryKeys.CUSTOMERS],
      async () => {
        const { data } = await api.get<ICustomer[]>(apiRoutes.customers);

        return data;
      },
      {
        enabled: !disable,
        onError: (error) => {
          errorHandler({
            error,
            addToast,
            title: 'Ocorreu um erro!',
          });
        },
      }
    );

  const ShowCustomer = (id?: string): UseQueryResult<ICustomer> =>
    useQuery(
      [QueryKeys.SHOW_CUSTOMER, id],
      async () => {
        const { data } = await api.get<ICustomer>(
          `${apiRoutes.customers}/${id}`
        );

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const DeleteCustomer = useMutation(
    async (id: string) => {
      const { data } = await api.delete(`${apiRoutes.customers}/${id}`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Empresa removida com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.CUSTOMERS],
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

  const CreateCustomer = useMutation(
    async (formData: IFormCreateCustomer) => {
      const { data } = await api.post(apiRoutes.customers, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Empresa criada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.CUSTOMERS],
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

  const UpdateCustomer = useMutation(
    async (formData: IUpdateData) => {
      const { data } = await api.put(
        `${apiRoutes.customers}/${formData.customerId}`,
        formData.data
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Empresa atualizada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.CUSTOMERS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_CUSTOMER],
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
    <CustomerContext.Provider
      value={{
        ListCustomers,
        ShowCustomer,
        DeleteCustomer,
        CreateCustomer,
        UpdateCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

function useCustomer(): CustomerContextData {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }

  return context;
}

export { CustomerProvider, useCustomer };
