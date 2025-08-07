import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Title from '@components/Title';
import FormInput from '@components/Form/FormInput';
import FormSelect from '@components/Form/FormSelect';
import Button from '@components/Button';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import {
  IFormUpdateEquipment,
  IEquipment,
} from '@modules/equipments/interfaces/IEquipment';

import { EquipmentSizesEnum } from '@modules/equipments/types/EquipmentSizesEnum';
import { TranslateEquipmentSizePT } from '@modules/equipments/utils/translateEquipmentSizeToPT';
import { TranslateEquipmentSizeEN } from '@modules/equipments/utils/translateEquipmentSizeToEN';

import { EquipmentTypesEnum } from '@modules/equipments/types/EquipmentTypesEnum';
import { TranslateEquipmentTypePT } from '@modules/equipments/utils/translateEquipmentTypeToPT';
import { TranslateEquipmentTypeEN } from '@modules/equipments/utils/translateEquipmentTypeToEN';

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
  EditEquipmentFormData,
  editEquipmentFormResolver,
} from './editEquipmentForm.zod';

interface IStateProps {
  state: {
    selectedEquipment?: IEquipment | undefined;
  };
}

const EditEquipment: React.FC = () => {
  const navigate = useNavigate();
  const { state }: IStateProps = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { UpdateEquipment } = useEquipment();

  useEffect(() => {
    document.title = 'Exy | Edição de Equipamento';
  }, [state.selectedEquipment]);

  const {
    getFieldState,
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditEquipmentFormData>({
    resolver: editEquipmentFormResolver,
    mode: 'all',
  });

  const onSubmit = useCallback(
    async (data: EditEquipmentFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormUpdateEquipment = {
          ...data,
          type: TranslateEquipmentTypeEN(data.type.value),
          size: TranslateEquipmentSizeEN(data.size.value),
          has_sensors: data.has_sensors.value,
          has_iot: data.has_iot.value,
        };

        await UpdateEquipment({
          equipmentId: state.selectedEquipment?.id || '',
          data: dataToSend,
        });

        navigate(PrivatePathsEnum.EQUIPMENTS);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [UpdateEquipment, navigate, state.selectedEquipment?.id]
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
          <Title value="Edição de Equipamento" />
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
                defaultValue={state.selectedEquipment?.name}
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
                optionsSelected={[
                  {
                    label: TranslateEquipmentTypePT(
                      state.selectedEquipment?.type || ''
                    ),
                    value: TranslateEquipmentTypePT(
                      state.selectedEquipment?.type || ''
                    ),
                  },
                ]}
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
                optionsSelected={[
                  {
                    label: TranslateEquipmentSizePT(
                      state.selectedEquipment?.size || ''
                    ),
                    value: TranslateEquipmentSizePT(
                      state.selectedEquipment?.size || ''
                    ),
                  },
                ]}
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
                defaultValue={state.selectedEquipment?.code}
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
                optionsSelected={[
                  {
                    label: state.selectedEquipment?.has_sensors ? 'Sim' : 'Não',
                    value: !!state.selectedEquipment?.has_sensors,
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
                optionsSelected={[
                  {
                    label: state.selectedEquipment?.has_iot ? 'Sim' : 'Não',
                    value: !!state.selectedEquipment?.has_iot,
                  },
                ]}
              />
              {errors.has_iot ? (
                <FormErrorMessage>{errors.has_iot.message}</FormErrorMessage>
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

export default EditEquipment;
