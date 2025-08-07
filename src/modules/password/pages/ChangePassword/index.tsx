import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiUnlock, FiSave } from 'react-icons/fi';
import { IoCaretBackSharp } from 'react-icons/io5';

import LoginInput from '@components/Form/LoginInput';
import { useAuth } from '@modules/auth/hooks/auth';
import { useUser } from '@modules/users/hooks';

import { IFormUpdatePassword } from '@modules/users/interfaces/IUser';
import Button from '../../../../components/Button';

import {
  Container,
  Title,
  Message,
  Form,
  FormContainer,
  ButtonsContainer,
} from './styles';
import {
  ChangePasswordFormData,
  changePasswordFormResolver,
} from './changePasswordForm.zod';

const ChangePassword: React.FC = () => {
  const {
    getFieldState,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: changePasswordFormResolver,
    mode: 'all',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { signOut, user } = useAuth();
  const { UpdatePassword } = useUser();

  const onSubmit = useCallback(
    async (data: ChangePasswordFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormUpdatePassword = {
          password: data.password,
          old_password: data.old_password,
        };

        await UpdatePassword(dataToSend);

        signOut();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [UpdatePassword, signOut]
  );

  useEffect(() => {
    document.title = 'Exy | Alteração de Senha';
  }, []);

  return (
    <Container>
      <FormContainer>
        <Title>Alteração de senha</Title>
        <Message>{user.name}</Message>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.old_password}>
            <LoginInput
              name="old_password"
              type="password"
              isPassword
              placeholder="Senha atual"
              register={register}
              state={getFieldState('old_password')}
              errors={errors.old_password}
              Icon={FiUnlock}
            />
            <FormErrorMessage>
              {errors.old_password && errors.old_password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <LoginInput
              name="password"
              type="password"
              isPassword
              placeholder="Senha"
              register={register}
              state={getFieldState('password')}
              errors={errors.password}
              Icon={FiUnlock}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmation}>
            <LoginInput
              name="confirmation"
              type="password"
              isPassword
              placeholder="Confirmação da senha"
              register={register}
              state={getFieldState('confirmation')}
              errors={errors.confirmation}
              Icon={FiUnlock}
            />
            <FormErrorMessage>
              {errors.confirmation && errors.confirmation.message}
            </FormErrorMessage>
          </FormControl>
          <ButtonsContainer>
            <Button
              size="md"
              label="Voltar"
              disabled={isSubmitting}
              loading={isLoading}
              type="button"
              Icon={IoCaretBackSharp}
              onClick={() => navigate(-1)}
            />
            <Button
              size="md"
              label="Salvar"
              disabled={isSubmitting}
              loading={isLoading}
              type="submit"
              Icon={FiSave}
            />
          </ButtonsContainer>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ChangePassword;
