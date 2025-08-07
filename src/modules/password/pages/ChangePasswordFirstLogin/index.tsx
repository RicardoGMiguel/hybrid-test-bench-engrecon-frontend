import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiUnlock, FiSave, FiLogOut } from 'react-icons/fi';

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
  ChangePasswordFirstLoginFormData,
  changePasswordFirstLoginFormResolver,
} from './changePasswordFirstLoginForm.zod';

const ChangePasswordFirstLogin: React.FC = () => {
  const {
    getFieldState,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFirstLoginFormData>({
    resolver: changePasswordFirstLoginFormResolver,
    mode: 'all',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useAuth();
  const { UpdatePassword } = useUser();

  const onSubmit = useCallback(
    async (data: ChangePasswordFirstLoginFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormUpdatePassword = {
          password: data.password,
          old_password: '12345678',
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
    document.title = 'Exy | Primeiro Acesso';
  }, []);

  return (
    <Container>
      <FormContainer>
        <Title>Primeiro Acesso</Title>
        <Message>Você deve alterar a sua senha no primeiro acesso</Message>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
              label="Sair"
              disabled={isSubmitting}
              loading={isLoading}
              type="button"
              Icon={FiLogOut}
              onClick={() => signOut()}
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

export default ChangePasswordFirstLogin;
