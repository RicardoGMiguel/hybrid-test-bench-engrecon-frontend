import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Title from '@components/Title';
import FormInput from '@components/Form/FormInput';
import Button from '@components/Button';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { IFormUpdateUser, IUser } from '@modules/users/interfaces/IUser';
import { useUser } from '../../hooks/index';
import {
  Container,
  Header,
  Content,
  InputColumn,
  FooterContainer,
  NoErrorSeparator,
  FormContainer,
} from './styles';
import { EditUserFormData, editUserFormResolver } from './editUserForm.zod';

interface IStateProps {
  state: {
    selectedUser?: IUser | undefined;
  };
}

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const { state }: IStateProps = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { UpdateUser } = useUser();

  useEffect(() => {
    document.title = 'Hybrid Test | Edição de Usuário';
  }, [state.selectedUser]);

  const {
    getFieldState,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormData>({
    resolver: editUserFormResolver,
    mode: 'all',
  });

  const onSubmit = useCallback(
    async (data: EditUserFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormUpdateUser = {
          ...data,
          phone: data.phone || null,
          cellphone: data.cellphone || null,
        };

        await UpdateUser({
          userId: state.selectedUser?.id || '',
          data: dataToSend,
        });

        navigate(PrivatePathsEnum.USERS);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [UpdateUser, navigate, state.selectedUser?.id]
  );

  return (
    <Container>
      <Header>
        <div>
          <Title value="Edição de Usuário" />
        </div>
      </Header>
      <Content onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <InputColumn>
            <FormControl isInvalid={!!errors.name}>
              <FormInput
                label="Nome Completo"
                register={register}
                name="name"
                state={getFieldState('name')}
                placeholder="nome completo..."
                errors={errors.name}
                defaultValue={state.selectedUser?.name}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormInput
                label="E-mail"
                register={register}
                name="email"
                state={getFieldState('email')}
                placeholder="email@email.com.br"
                errors={errors.email}
                defaultValue={state.selectedUser?.email}
              />
              {errors.email ? (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.cpf}>
              <FormInput
                label="CPF"
                mask="999.999.999-99"
                register={register}
                name="cpf"
                state={getFieldState('cpf')}
                placeholder="123.123.123-12"
                errors={errors.cpf}
                defaultValue={state.selectedUser?.cpf}
              />
              {errors.cpf ? (
                <FormErrorMessage>{errors.cpf.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </InputColumn>
          <InputColumn>
            <FormControl isInvalid={!!errors.phone}>
              <FormInput
                label="Telefone"
                mask="(99) 9999-9999"
                register={register}
                name="phone"
                state={getFieldState('phone')}
                placeholder="(11) 1234-1234"
                errors={errors.phone}
                defaultValue={state.selectedUser?.phone}
              />
              {errors.phone ? (
                <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.cellphone}>
              <FormInput
                label="Celular"
                mask="(99) 99999-9999"
                register={register}
                name="cellphone"
                state={getFieldState('cellphone')}
                placeholder="(11) 91234-1234"
                errors={errors.cellphone}
                defaultValue={state.selectedUser?.cellphone}
              />
              {errors.cellphone ? (
                <FormErrorMessage>{errors.cellphone.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.professional_registry}>
              <FormInput
                label="Registro Profissional"
                register={register}
                name="professional_registry"
                state={getFieldState('professional_registry')}
                placeholder=""
                errors={errors.professional_registry}
                defaultValue={state.selectedUser?.professional_registry}
              />
              {errors.professional_registry ? (
                <FormErrorMessage>
                  {errors.professional_registry.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </InputColumn>
          <InputColumn>
            <FormControl isInvalid={!!errors.position}>
              <FormInput
                label="Cargo"
                register={register}
                name="position"
                state={getFieldState('position')}
                placeholder=""
                errors={errors.position}
                defaultValue={state.selectedUser?.position}
              />
              {errors.position ? (
                <FormErrorMessage>{errors.position.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </InputColumn>
        </FormContainer>
        <FooterContainer>
          <Button
            type="submit"
            label="Salvar"
            Icon={FiSave}
            disabled={isSubmitting || isLoading}
          />
        </FooterContainer>
      </Content>
    </Container>
  );
};

export default EditUser;
