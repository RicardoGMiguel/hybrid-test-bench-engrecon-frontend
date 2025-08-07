import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Title from '@components/Title';
import FormInput from '@components/Form/FormInput';
import FormSelect from '@components/Form/FormSelect';
import Button from '@components/Button';
import axios from 'axios';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';

import { TranslateCustomerSizePT } from '@modules/customers/utils/translateCustomerSizeToPT';
import { IFormCreateCustomer } from '@modules/customers/interfaces/ICustomer';
import { CustomerSizesEnum } from '@modules/customers/types/CustomerSizesEnum';
import { TranslateCustomerSizeEN } from '@modules/customers/utils/translateCustomerSizeToEN';
import { useCustomer } from '../../hooks/index';
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
  CreateCustomerFormData,
  createCustomerFormResolver,
} from './createCustomerForm.zod';

const CreateCustomers: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { CreateCustomer } = useCustomer();

  useEffect(() => {
    document.title = 'Exy | Cadastro de Empresas';
  }, []);

  const {
    getFieldState,
    handleSubmit,
    register,
    control,
    setValue,
    resetField,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateCustomerFormData>({
    resolver: createCustomerFormResolver,
    mode: 'all',
  });

  const watchCep = watch('address_zipcode');

  const getLocationByCep = useCallback(
    async (cepField: string) => {
      if (cepField.length >= 8) {
        await axios
          .get(`https://viacep.com.br/ws/${cepField}/json/`)
          .then((response) => {
            setValue('address_zipcode', response.data.cep);
            setValue('address_street', response.data.logradouro);
            setValue('address_district', response.data.bairro);
            setValue('address_city', response.data.localidade);
            setValue('address_state', response.data.uf);
          });
        return;
      }
      resetField('address_street');
      resetField('address_district');
      resetField('address_city');
      resetField('address_state');
    },
    [resetField, setValue]
  );

  const onSubmit = useCallback(
    async (data: CreateCustomerFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormCreateCustomer = {
          ...data,
          address_number: Number(data.address_number),
          project_quantity_limit: Number(data.project_quantity_limit),
          company_size: TranslateCustomerSizeEN(data.company_size.value),
          phone: data.phone || null,
          cellphone: data.cellphone || null,
        };

        if (!data.address_complement) dataToSend.address_complement = null;

        await CreateCustomer(dataToSend);

        navigate(PrivatePathsEnum.CUSTOMERS);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [CreateCustomer, navigate]
  );

  const sizeOptions = [
    {
      label: TranslateCustomerSizePT(CustomerSizesEnum.LARGE),
      value: TranslateCustomerSizePT(CustomerSizesEnum.LARGE),
    },
    {
      label: TranslateCustomerSizePT(CustomerSizesEnum.MEDIUM),
      value: TranslateCustomerSizePT(CustomerSizesEnum.MEDIUM),
    },
    {
      label: TranslateCustomerSizePT(CustomerSizesEnum.SMALL),
      value: TranslateCustomerSizePT(CustomerSizesEnum.SMALL),
    },
    {
      label: TranslateCustomerSizePT(CustomerSizesEnum.MICRO),
      value: TranslateCustomerSizePT(CustomerSizesEnum.MICRO),
    },
  ];

  return (
    <Container>
      <Header>
        <div>
          <Title value="Cadastro de Empresas" />
        </div>
      </Header>
      <Content onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <InputColumn>
            <FormControl isInvalid={!!errors.name}>
              <FormInput
                label="Nome"
                register={register}
                name="name"
                state={getFieldState('name')}
                placeholder="nome..."
                errors={errors.name}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.cnpj}>
              <FormInput
                label="CNPJ"
                mask="99.999.999/9999-99"
                register={register}
                name="cnpj"
                state={getFieldState('cnpj')}
                placeholder="21353211/0001-66"
                errors={errors.cnpj}
              />
              {errors.cnpj ? (
                <FormErrorMessage>{errors.cnpj.message}</FormErrorMessage>
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
            <FormControl isInvalid={!!errors.address_zipcode}>
              <FormInput
                mask="99999-999"
                label="CEP"
                register={register}
                name="address_zipcode"
                state={getFieldState('address_zipcode')}
                placeholder="12345-123"
                errors={errors.address_zipcode}
                onBlurEvent={() => getLocationByCep(watchCep)}
              />
              {errors.address_zipcode ? (
                <FormErrorMessage>
                  {errors.address_zipcode.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </InputColumn>
          <InputColumn>
            <FormControl isInvalid={!!errors.address_street}>
              <FormInput
                label="Rua"
                register={register}
                name="address_street"
                state={getFieldState('address_street')}
                placeholder=""
                errors={errors.address_street}
              />
              {errors.address_street ? (
                <FormErrorMessage>
                  {errors.address_street.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.address_district}>
              <FormInput
                label="Bairro"
                register={register}
                name="address_district"
                state={getFieldState('address_district')}
                placeholder=""
                errors={errors.address_district}
              />
              {errors.address_district ? (
                <FormErrorMessage>
                  {errors.address_district.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.address_city}>
              <FormInput
                label="Cidade"
                readOnly
                register={register}
                name="address_city"
                state={getFieldState('address_city')}
                placeholder=""
                errors={errors.address_city}
              />
              {errors.address_city ? (
                <FormErrorMessage>
                  {errors.address_city.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.address_state}>
              <FormInput
                label="Estado"
                readOnly
                register={register}
                name="address_state"
                state={getFieldState('address_state')}
                placeholder=""
                errors={errors.address_state}
              />
              {errors.address_state ? (
                <FormErrorMessage>
                  {errors.address_state.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </InputColumn>
          <InputColumn>
            <FormControl isInvalid={!!errors.address_number}>
              <FormInput
                type="number"
                label="Número"
                register={register}
                name="address_number"
                state={getFieldState('address_number')}
                placeholder="0000"
                errors={errors.address_number}
              />
              {errors.address_number ? (
                <FormErrorMessage>
                  {errors.address_number.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.address_complement}>
              <FormInput
                label="Complemento"
                register={register}
                name="address_complement"
                state={getFieldState('address_complement')}
                placeholder=""
                errors={errors.address_complement}
              />
              {errors.address_complement ? (
                <FormErrorMessage>
                  {errors.address_complement.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
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
          </InputColumn>
          <InputColumn>
            <FormControl isInvalid={!!errors.activity_branch}>
              <FormInput
                label="Ramo de Atividade"
                register={register}
                name="activity_branch"
                state={getFieldState('activity_branch')}
                placeholder=""
                errors={errors.activity_branch}
              />
              {errors.activity_branch ? (
                <FormErrorMessage>
                  {errors.activity_branch.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.company_size}>
              <FormSelect
                label="Tamanho"
                control={control}
                name="company_size"
                placeholder="Selecione um tamanho"
                options={sizeOptions}
              />
              {errors.company_size ? (
                <FormErrorMessage>
                  {errors.company_size.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.project_quantity_limit}>
              <FormInput
                type="number"
                label="Limite de Projetos"
                register={register}
                name="project_quantity_limit"
                state={getFieldState('project_quantity_limit')}
                placeholder=""
                errors={errors.project_quantity_limit}
              />
              {errors.project_quantity_limit ? (
                <FormErrorMessage>
                  {errors.project_quantity_limit.message}
                </FormErrorMessage>
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

export default CreateCustomers;
