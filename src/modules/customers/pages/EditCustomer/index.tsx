import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Title from '@components/Title';
import FormInput from '@components/Form/FormInput';
import FormSelect from '@components/Form/FormSelect';
import Button from '@components/Button';
import axios from 'axios';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import {
  IFormUpdateCustomer,
  ICustomer,
} from '@modules/customers/interfaces/ICustomer';
import { TranslateCustomerSizeEN } from '@modules/customers/utils/translateCustomerSizeToEN';
import { TranslateCustomerSizePT } from '@modules/customers/utils/translateCustomerSizeToPT';
import { CustomerSizesEnum } from '@modules/customers/types/CustomerSizesEnum';
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
  EditCustomerFormData,
  editCustomerFormResolver,
} from './editCustomerForm.zod';

interface IStateProps {
  state: {
    selectedCustomer?: ICustomer | undefined;
  };
}

const EditCustomer: React.FC = () => {
  const navigate = useNavigate();
  const { state }: IStateProps = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { UpdateCustomer } = useCustomer();

  useEffect(() => {
    document.title = 'Exy | Edição de Empresa';
  }, [state.selectedCustomer]);

  const {
    getFieldState,
    handleSubmit,
    register,
    control,
    setValue,
    resetField,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditCustomerFormData>({
    resolver: editCustomerFormResolver,
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
    async (data: EditCustomerFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormUpdateCustomer = {
          ...data,
          address_number: Number(data.address_number),
          project_quantity_limit: Number(data.project_quantity_limit),
          company_size: TranslateCustomerSizeEN(data.company_size.value),
          phone: data.phone || null,
          cellphone: data.cellphone || null,
        };

        if (!data.address_complement) dataToSend.address_complement = null;

        await UpdateCustomer({
          customerId: state.selectedCustomer?.id || '',
          data: dataToSend,
        });

        navigate(PrivatePathsEnum.CUSTOMERS);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [UpdateCustomer, navigate, state.selectedCustomer?.id]
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
          <Title value="Edição de Empresa" />
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
                defaultValue={state.selectedCustomer?.name}
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
                defaultValue={state.selectedCustomer?.cnpj}
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
                defaultValue={state.selectedCustomer?.email}
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
                defaultValue={state.selectedCustomer?.address_zipcode}
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
                defaultValue={state.selectedCustomer?.address_street}
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
                defaultValue={state.selectedCustomer?.address_district}
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
                defaultValue={state.selectedCustomer?.address_city}
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
                defaultValue={state.selectedCustomer?.address_state}
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
                defaultValue={state.selectedCustomer?.address_number}
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
                defaultValue={state.selectedCustomer?.address_complement}
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
                defaultValue={state.selectedCustomer?.phone}
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
                defaultValue={state.selectedCustomer?.cellphone}
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
                defaultValue={state.selectedCustomer?.activity_branch}
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
                optionsSelected={[
                  {
                    label: TranslateCustomerSizePT(
                      state.selectedCustomer?.company_size || ''
                    ),
                    value: TranslateCustomerSizePT(
                      state.selectedCustomer?.company_size || ''
                    ),
                  },
                ]}
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
                defaultValue={state.selectedCustomer?.project_quantity_limit}
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

export default EditCustomer;
