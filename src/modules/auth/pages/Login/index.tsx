import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage, useDisclosure } from '@chakra-ui/react';
import { FiUser, FiUnlock } from 'react-icons/fi';

import { useToast } from '@hooks/toast';
import { errorHandler } from '@errors/errorHandler';
import LoginInput from '@components/Form/LoginInput';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { useAuth } from '@modules/auth/hooks/auth';

import imgLogo from '@assets/login-logo.png';
import Button from '../../../../components/Button';

import ForgotPasswordMessage from './ForgotPasswordMessage';

import {
  Container,
  LoginLogo,
  Form,
  FormContainer,
  ForgotContainer,
} from './styles';
import { LoginFormData, loginFormResolver } from './loginForm.zod';

const Login: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    getFieldState,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: loginFormResolver,
    mode: 'all',
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        setIsLoading(true);

        await signIn(data);

        navigate(PrivatePathsEnum.PROJECTS);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        errorHandler({
          error,
          addToast,
          title: 'Ocorreu um erro!',
        });
      }
    },
    [addToast, navigate, signIn]
  );

  useEffect(() => {
    document.title = 'Exy | Login';
  }, []);

  return (
    <>
      <ForgotPasswordMessage isOpen={isOpen} onClose={onClose} />
      <Container>
        <FormContainer>
          <LoginLogo src={imgLogo} alt="Logo" />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email}>
              <LoginInput
                register={register}
                name="email"
                state={getFieldState('email')}
                placeholder="E-mail"
                errors={errors.email}
                Icon={FiUser}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
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
            <ForgotContainer>
              <button onClick={onOpen} type="button">
                Esqueceu sua senha?
              </button>
            </ForgotContainer>
            <Button
              size="md"
              label="Login"
              disabled={isSubmitting}
              loading={isLoading}
              type="submit"
            />
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default Login;
