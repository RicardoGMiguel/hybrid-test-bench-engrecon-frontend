import { AppError } from './AppError';

import { IToastMessageParams } from '../hooks/toast';

interface HandlerProps {
  // eslint-disable-next-line no-unused-vars
  addToast: (message: IToastMessageParams) => void;
  error: any;
  title: string;
}

/**
 * Handler de erro para ser adicionado em todos os catches da aplicação.
 */
export const errorHandler = ({ error, title, addToast }: HandlerProps) => {
  if (error.response) {
    addToast({
      type: 'error',
      title,
      description: error.response.data.message,
    });
  } else if (error instanceof AppError) {
    addToast({ type: 'error', title, description: error.message });
  } else {
    addToast({
      type: 'error',
      title: 'Erro interno. Tente novamente mais tarde.',
    });
  }
};
