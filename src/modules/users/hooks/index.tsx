import React, { createContext, useContext } from 'react';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

import { errorHandler } from '@errors/errorHandler';

import { api, apiRoutes } from '@services/api';
import { QueryKeys, queryClient } from '@services/queryClient';

import {
  IUser,
  IFormCreateUser,
  IFormUpdateUser,
  IFormUpdatePassword,
} from '@modules/users/interfaces/IUser';

import { useToast } from '@hooks/toast';
import { UserRolesEnum } from '../types/UserRolesEnum';

interface IUpdateData {
  userId: string;
  data: IFormUpdateUser;
}

interface UserContextData {
  ListUsers(customerId?: string, role?: UserRolesEnum): UseQueryResult<IUser[]>;
  ShowUser(id?: string): UseQueryResult<IUser>;
  DeleteUser: (id: string) => Promise<void>;
  CreateUser: (requestData: IFormCreateUser) => Promise<void>;
  UpdateUser: (requestData: IUpdateData) => Promise<void>;
  UpdatePassword: (requestData: IFormUpdatePassword) => Promise<void>;
  ResetPassword: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface IUserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const ListUsers = (
    customerId?: string,
    role?: UserRolesEnum
  ): UseQueryResult<IUser[]> =>
    useQuery(
      [QueryKeys.USERS, customerId, role],
      async () => {
        const { data } = await api.get<IUser[]>(apiRoutes.users, {
          params: {
            customer_id: customerId,
            role,
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

  const ShowUser = (id?: string): UseQueryResult<IUser> =>
    useQuery(
      [QueryKeys.SHOW_USER, id],
      async () => {
        const { data } = await api.get<IUser>(`${apiRoutes.users}/${id}`);

        return data;
      },
      {
        enabled: !!id,
      }
    );

  const DeleteUser = useMutation(
    async (id: string) => {
      const { data } = await api.delete(`${apiRoutes.users}/${id}`);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Usuário removido com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.USERS],
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

  const CreateUser = useMutation(
    async (formData: IFormCreateUser) => {
      const { data } = await api.post(apiRoutes.users, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Usuário criado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.USERS],
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

  const UpdateUser = useMutation(
    async (formData: IUpdateData) => {
      const { data } = await api.put(
        `${apiRoutes.users}/${formData.userId}`,
        formData.data
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Usuário atualizado com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.USERS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_USER],
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

  const UpdatePassword = useMutation(
    async (formData: IFormUpdatePassword) => {
      const { data } = await api.patch(`${apiRoutes.users}/password`, formData);

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Senha atualizada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.USERS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_USER],
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

  const ResetPassword = useMutation(
    async (id: string) => {
      const { data } = await api.patch(
        `${apiRoutes.users}/${id}/reset_password`
      );

      return data;
    },
    {
      onSuccess: async () => {
        addToast({
          title: 'Executado',
          description: 'Senha resetada com sucesso',
          type: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.USERS],
        });

        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.SHOW_USER],
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
    <UserContext.Provider
      value={{
        ListUsers,
        ShowUser,
        DeleteUser,
        CreateUser,
        UpdateUser,
        UpdatePassword,
        ResetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export { UserProvider, useUser };
