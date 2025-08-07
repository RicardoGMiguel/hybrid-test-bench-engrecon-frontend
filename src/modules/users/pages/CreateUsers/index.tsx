import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Title from '@components/Title';
import FormInput from '@components/Form/FormInput';
import FormSelect from '@components/Form/FormSelect';
import Button from '@components/Button';

import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { TranslateRoleEN } from '@modules/users/utils/translateRoleToEN';
import { TranslateRolePT } from '@modules/users/utils/translateRoleToPT';
import { IFormCreateUser } from '@modules/users/interfaces/IUser';
import { useAuth } from '@modules/auth/hooks/auth/index';
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
import {
  CreateUserFormData,
  createUserFormResolver,
} from './createUserForm.zod';

const CreateUsers: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { CreateUser } = useUser();

  useEffect(() => {
    document.title = 'Hybrid Test | Cadastro de Usuários';
  }, []);

  const {
    getFieldState,
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: createUserFormResolver(user.role),
    mode: 'all',
  });

  const onSubmit = useCallback(
    async (data: CreateUserFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormCreateUser = {
          ...data,
          role: TranslateRoleEN(data.role.value),
          phone: data.phone || null,
          cellphone: data.cellphone || null,
          customer_id: data.customer_id?.value,
        };

        await CreateUser(dataToSend);

        navigate(PrivatePathsEnum.USERS);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [CreateUser, navigate]
  );

  const rolesOptions =
    user.role === UserRolesEnum.GLOBAL_ADMIN
      ? [
          {
            label: TranslateRolePT(UserRolesEnum.CUSTOMER_ADMIN),
            value: TranslateRolePT(UserRolesEnum.CUSTOMER_ADMIN),
          },
          {
            label: TranslateRolePT(UserRolesEnum.HEALTH),
            value: TranslateRolePT(UserRolesEnum.HEALTH),
          },
          {
            label: TranslateRolePT(UserRolesEnum.VIEWER),
            value: TranslateRolePT(UserRolesEnum.VIEWER),
          },
        ]
      : [
          {
            label: TranslateRolePT(UserRolesEnum.CUSTOMER_ADMIN),
            value: TranslateRolePT(UserRolesEnum.CUSTOMER_ADMIN),
          },

          {
            label: TranslateRolePT(UserRolesEnum.VIEWER),
            value: TranslateRolePT(UserRolesEnum.VIEWER),
          },
        ];

  const userRoleWatch = watch('role');

  useEffect(() => {
    if (TranslateRoleEN(userRoleWatch?.value) === UserRolesEnum.HEALTH) {
      setValue('customer_id', undefined);
    }
  }, [setValue, userRoleWatch?.value]);

  return (
    <Container>
      <Header>
        <div>
          <Title value="Cadastro de Usuários" />
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
              />
              {errors.email ? (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.cpf}>
              <FormInput
                mask="999.999.999-99"
                label="CPF"
                register={register}
                name="cpf"
                state={getFieldState('cpf')}
                placeholder="123.123.123-12"
                errors={errors.cpf}
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
              />
              {errors.position ? (
                <FormErrorMessage>{errors.position.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.role}>
              <FormSelect
                label="Nível de Acesso"
                control={control}
                name="role"
                placeholder="Selecione um nível de acesso"
                options={rolesOptions}
              />
              {errors.role ? (
                <FormErrorMessage>{errors.role.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            {user.role === UserRolesEnum.GLOBAL_ADMIN &&
              TranslateRoleEN(userRoleWatch?.value) !==
                UserRolesEnum.HEALTH && (
                <FormControl isInvalid={!!errors.customer_id}>
                  <FormSelect
                    label="Empresa"
                    control={control}
                    name="customer_id"
                    placeholder="Selecione uma empresa"
                    options={[]}
                  />
                  {errors.customer_id ? (
                    <FormErrorMessage>
                      {errors.customer_id.message}
                    </FormErrorMessage>
                  ) : (
                    <NoErrorSeparator />
                  )}
                </FormControl>
              )}
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

export default CreateUsers;
