import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Title from '@components/Title';
import FormInput from '@components/Form/FormInput';
import FormSelect, { OptionItem } from '@components/Form/FormSelect';
import Button from '@components/Button';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';

import { IFormCreateEquipment } from '@modules/equipments/interfaces/IEquipment';

import { EquipmentSizesEnum } from '@modules/equipments/types/EquipmentSizesEnum';
import { TranslateEquipmentSizePT } from '@modules/equipments/utils/translateEquipmentSizeToPT';
import { TranslateEquipmentSizeEN } from '@modules/equipments/utils/translateEquipmentSizeToEN';

import { EquipmentTypesEnum } from '@modules/equipments/types/EquipmentTypesEnum';
import { TranslateEquipmentTypePT } from '@modules/equipments/utils/translateEquipmentTypeToPT';
import { TranslateEquipmentTypeEN } from '@modules/equipments/utils/translateEquipmentTypeToEN';

import { useCustomer } from '@modules/customers/hooks/index';
import { useEquipment } from '../../hooks/index';
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
  CreateEquipmentFormData,
  createEquipmentFormResolver,
} from './createEquipmentForm.zod';

const CreateEquipments: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { CreateEquipment } = useEquipment();
  const { ListCustomers } = useCustomer();

  const [customersOptions, setCustomersOptions] = useState<OptionItem[]>([]);

  useEffect(() => {
    document.title = 'Exy | Cadastro de Equipamentos';
  }, []);

  const { data: customersData } = ListCustomers();

  useEffect(() => {
    if (customersData) {
      const options: OptionItem[] = customersData.map((customer) => ({
        label: customer.name,
        value: customer.id,
      }));

      setCustomersOptions(options);
    }
  }, [customersData]);

  const {
    getFieldState,
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateEquipmentFormData>({
    resolver: createEquipmentFormResolver,
    mode: 'all',
  });

  const onSubmit = useCallback(
    async (data: CreateEquipmentFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormCreateEquipment = {
          ...data,
          type: TranslateEquipmentTypeEN(data.type.value),
          size: TranslateEquipmentSizeEN(data.size.value),
          has_sensors: data.has_sensors.value,
          has_iot: data.has_iot.value,
          customer_id: data.customer_id.value,
        };

        await CreateEquipment(dataToSend);

        navigate(PrivatePathsEnum.EQUIPMENTS);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [CreateEquipment, navigate]
  );

  const typeOptions = [
    {
      label: TranslateEquipmentTypePT(EquipmentTypesEnum.BACK),
      value: TranslateEquipmentTypePT(EquipmentTypesEnum.BACK),
    },
    {
      label: TranslateEquipmentTypePT(EquipmentTypesEnum.SHOULDER),
      value: TranslateEquipmentTypePT(EquipmentTypesEnum.SHOULDER),
    },
    {
      label: TranslateEquipmentTypePT(EquipmentTypesEnum.HYBRID),
      value: TranslateEquipmentTypePT(EquipmentTypesEnum.HYBRID),
    },
    {
      label: TranslateEquipmentTypePT(EquipmentTypesEnum.OTHER),
      value: TranslateEquipmentTypePT(EquipmentTypesEnum.OTHER),
    },
  ];

  const sizeOptions = [
    {
      label: TranslateEquipmentSizePT(EquipmentSizesEnum.UNIQUE),
      value: TranslateEquipmentSizePT(EquipmentSizesEnum.UNIQUE),
    },
    {
      label: TranslateEquipmentSizePT(EquipmentSizesEnum.SMALL_MEDIUM),
      value: TranslateEquipmentSizePT(EquipmentSizesEnum.SMALL_MEDIUM),
    },
    {
      label: TranslateEquipmentSizePT(EquipmentSizesEnum.MEDIUM_LARGE),
      value: TranslateEquipmentSizePT(EquipmentSizesEnum.MEDIUM_LARGE),
    },
  ];

  return (
    <Container>
      <Header>
        <div>
          <Title value="Cadastro de Equipamentos" />
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
            <FormControl isInvalid={!!errors.type}>
              <FormSelect
                label="Tipo"
                control={control}
                name="type"
                placeholder="Selecione um tipo"
                options={typeOptions}
              />
              {errors.type ? (
                <FormErrorMessage>{errors.type.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.size}>
              <FormSelect
                label="Tamanho"
                control={control}
                name="size"
                placeholder="Selecione um tamanho"
                options={sizeOptions}
              />
              {errors.size ? (
                <FormErrorMessage>{errors.size.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.code}>
              <FormInput
                label="Código"
                register={register}
                name="code"
                state={getFieldState('code')}
                placeholder=""
                errors={errors.code}
              />
              {errors.code ? (
                <FormErrorMessage>{errors.code.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </InputColumn>
          <InputColumn>
            <FormControl isInvalid={!!errors.has_sensors}>
              <FormSelect
                label="É sensorizado?"
                control={control}
                name="has_sensors"
                placeholder=""
                options={[
                  {
                    label: 'Sim',
                    value: true,
                  },
                  {
                    label: 'Não',
                    value: false,
                  },
                ]}
              />
              {errors.has_sensors ? (
                <FormErrorMessage>
                  {errors.has_sensors.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.has_iot}>
              <FormSelect
                label="Tem IoT?"
                control={control}
                name="has_iot"
                placeholder=""
                options={[
                  {
                    label: 'Sim',
                    value: true,
                  },
                  {
                    label: 'Não',
                    value: false,
                  },
                ]}
              />
              {errors.has_iot ? (
                <FormErrorMessage>{errors.has_iot.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.customer_id}>
              <FormSelect
                label="Empresa"
                control={control}
                name="customer_id"
                placeholder="Selecione uma empresa"
                options={customersOptions}
              />
              {errors.customer_id ? (
                <FormErrorMessage>
                  {errors.customer_id.message}
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

export default CreateEquipments;
