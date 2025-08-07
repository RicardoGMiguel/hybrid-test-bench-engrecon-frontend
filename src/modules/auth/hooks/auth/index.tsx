/* eslint-disable no-alert */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { AxiosError } from 'axios';

import { IUser } from '@modules/users/interfaces/IUser';
import { AuthApiRoutes } from '@modules/auth/api/paths.routes';
import { api } from '@services/api';
import { useToast } from '@hooks/toast';

interface AuthState {
  user: IUser;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser;
  isLoading: boolean;
  updateUser(user: IUser): Promise<void>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(message?: string): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const storageVariables = {
  token: '@Exy:token',
  user: '@Exy:user',
};

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isLoading, setLoading] = useState<boolean>(true);

  const signOut = useCallback(
    (message?: string) => {
      localStorage.removeItem(storageVariables.token);
      localStorage.removeItem(storageVariables.user);
      if (message && typeof message === 'string') {
        addToast({
          title: 'Erro de autenticação',
          type: 'error',
          description: message,
        });
      }

      setData({} as AuthState);
    },
    [addToast]
  );

  const configureAxios = useCallback(
    (token: string) => {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      api.interceptors.response.use(
        (response) => response,
        (error: unknown) => {
          if (error instanceof AxiosError) {
            if (error.response?.data.message === 'Invalid JWT token.') {
              addToast({
                title: 'Sua sessão expirou',
                description: 'Faça login novamente!',
                type: 'warning',
              });

              signOut();
            }
          }
          return Promise.reject(error);
        }
      );
    },
    [signOut, addToast]
  );

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      setLoading(true);

      const response = await api.post(AuthApiRoutes.SESSIONS, {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem(storageVariables.token, token);
      localStorage.setItem(storageVariables.user, JSON.stringify(user));

      configureAxios(token);

      setData({ user });
      setLoading(false);
    },
    [configureAxios]
  );

  const updateUser = useCallback(async (user: IUser) => {
    localStorage.setItem(storageVariables.user, JSON.stringify(user));
    setData({ user });
  }, []);

  useEffect(() => {
    function loadStorageData() {
      setLoading(true);

      const user = localStorage.getItem(storageVariables.user);
      const token = localStorage.getItem(storageVariables.token);

      if (user && token) {
        const parsedUser: IUser = JSON.parse(user);

        configureAxios(token);
        setData({ user: parsedUser });
      }

      setLoading(false);
    }

    loadStorageData();
  }, [configureAxios]);

  return (
    <AuthContext.Provider
      value={{ user: data.user, isLoading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
