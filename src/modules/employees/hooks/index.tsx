import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  IEmployee,
  IFormCreateEmployee,
  IFormUpdateEmployee,
} from '@modules/employees/interfaces/IEmployee';

import { useToast } from '@hooks/toast';

interface IUpdateData {
  employeeId: string;
  data: IFormUpdateEmployee;
}

interface EmployeeContextData {
  ListEmployees(customerId?: string): UseQueryResult<IEmployee[]>;
  ShowEmployee(id?: string): UseQueryResult<IEmployee>;
  DeleteEmployee: (id: string) => Promise<void>;
  CreateEmployee: (requestData: IFormCreateEmployee) => Promise<void>;
  UpdateEmployee: (requestData: IUpdateData) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextData>(
  {} as EmployeeContextData
);

interface IEmployeeProviderProps {
  children: React.ReactNode;
}

const EmployeeProvider: React.FC<IEmployeeProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const ListEmployees = (customerId?: string): UseQueryResult<IEmployee[]> =>
    useQuery(
      [QueryKeys.EMPLOYEES, customerId],
      async () => {
        const { data } = await api.get<IEmployee[]>(apiRoutes.employees, {
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

  const ShowEmployee = (id?: string): UseQueryResult<IEmployee> =>
    useQuery(
      [QueryKeys.SHOW_EMPLOYEE, id],
      async () => {
        const { data } = await api.get<IEmployee>(
          `${apiRoutes.employees}/${id}`
        );

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const DeleteEmployee = useMutation(
    async (id: string) => {
      const { data } = await api.delete(`${apiRoutes.employees}/${id}`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Colaborador removido com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.EMPLOYEES],
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

  const CreateEmployee = useMutation(
    async (formData: IFormCreateEmployee) => {
      const { data } = await api.post(apiRoutes.employees, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Colaborador criado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.EMPLOYEES],
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

  const UpdateEmployee = useMutation(
    async (formData: IUpdateData) => {
      const { data } = await api.put(
        `${apiRoutes.employees}/${formData.employeeId}`,
        formData.data
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Colaborador atualizado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.EMPLOYEES],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_EMPLOYEE],
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
    <EmployeeContext.Provider
      value={{
        ListEmployees,
        ShowEmployee,
        DeleteEmployee,
        CreateEmployee,
        UpdateEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

function useEmployee(): EmployeeContextData {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error('useEmployee must be used within a EmployeeProvider');
  }

  return context;
}

export { EmployeeProvider, useEmployee };
