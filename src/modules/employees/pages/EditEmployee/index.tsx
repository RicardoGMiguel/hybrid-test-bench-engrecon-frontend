import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Title from '@components/Title';
import FormInput from '@components/Form/FormInput';
import Button from '@components/Button';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import {
  IFormUpdateEmployee,
  IEmployee,
} from '@modules/employees/interfaces/IEmployee';
import { TranslateGenderToEN } from '@modules/employees/utils/translateGenderToEN';
import { TranslateGenderToPT } from '@modules/employees/utils/translateGenderToPT';
import { GenderEnum } from '@modules/employees/types/GenderEnum';
import FormSelect from '@components/Form/FormSelect';
import FormDatePicker from '@components/Form/FormDatePicker';
import { useEmployee } from '../../hooks/index';
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
  EditEmployeeFormData,
  editEmployeeFormResolver,
} from './editEmployeeForm.zod';

interface IStateProps {
  state: {
    selectedEmployee?: IEmployee | undefined;
  };
}

const EditEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { state }: IStateProps = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { UpdateEmployee } = useEmployee();

  useEffect(() => {
    document.title = 'Exy | Edição de Colaborador';
  }, [state.selectedEmployee]);

  const {
    getFieldState,
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<EditEmployeeFormData>({
    resolver: editEmployeeFormResolver,
    mode: 'all',
  });

  const onSubmit = useCallback(
    async (data: EditEmployeeFormData) => {
      try {
        setIsLoading(true);

        const newData = { ...data };

        delete newData.imc;

        const dataToSend: IFormUpdateEmployee = {
          ...newData,
          gender: TranslateGenderToEN(data.gender.value),
          height: Number(data.height),
          weight: Number(data.weight),
        };

        await UpdateEmployee({
          employeeId: state.selectedEmployee?.id || '',
          data: dataToSend,
        });

        navigate(PrivatePathsEnum.EMPLOYEES);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [UpdateEmployee, navigate, state.selectedEmployee?.id]
  );

  const genderOptions = [
    {
      label: TranslateGenderToPT(GenderEnum.FEMALE),
      value: TranslateGenderToPT(GenderEnum.FEMALE),
    },
    {
      label: TranslateGenderToPT(GenderEnum.MALE),
      value: TranslateGenderToPT(GenderEnum.MALE),
    },
  ];

  const heightWatch = watch('height');
  const weightWatch = watch('weight');

  useEffect(() => {
    if (Number(heightWatch) > 0 && Number(weightWatch) > 0) {
      const heightInMeters = Number(heightWatch) / 100;
      const imc = (Number(weightWatch) / heightInMeters ** 2).toFixed(1);
      setValue('imc', imc);
      return;
    }
    setValue('imc', '');
  }, [heightWatch, setValue, state.selectedEmployee, weightWatch]);

  useEffect(() => {
    if (state.selectedEmployee) {
      setValue('imc', String(state.selectedEmployee.imc));
      setValue(
        'birth_date',
        new Date(state.selectedEmployee?.birth_date || new Date())
      );
    }
  }, [setValue, state.selectedEmployee]);

  return (
    <Container>
      <Header>
        <div>
          <Title value="Edição de Colaborador" />
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
                defaultValue={state.selectedEmployee?.name}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.gender}>
              <FormSelect
                label="Sexo"
                control={control}
                name="gender"
                placeholder="Selecione um gênero"
                options={genderOptions}
                optionsSelected={[
                  {
                    label: TranslateGenderToPT(
                      state.selectedEmployee?.gender || ''
                    ),
                    value: TranslateGenderToPT(
                      state.selectedEmployee?.gender || ''
                    ),
                  },
                ]}
              />
              {errors.gender ? (
                <FormErrorMessage>{errors.gender.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.professional_registry}>
              <FormInput
                label="Registro"
                register={register}
                name="professional_registry"
                state={getFieldState('professional_registry')}
                placeholder=""
                errors={errors.professional_registry}
                defaultValue={state.selectedEmployee?.professional_registry}
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
            <FormControl isInvalid={!!errors.birth_date}>
              <FormDatePicker
                control={control}
                label="Data de Nascimento"
                register={register}
                name="birth_date"
                state={getFieldState('birth_date')}
                placeholder="Selecione uma data..."
                errors={errors.birth_date}
                maxDate={new Date(Date.now())}
              />
              {errors.birth_date ? (
                <FormErrorMessage>{errors.birth_date.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.position}>
              <FormInput
                label="Cargo"
                register={register}
                name="position"
                state={getFieldState('position')}
                placeholder=""
                errors={errors.position}
                defaultValue={state.selectedEmployee?.position}
              />
              {errors.position ? (
                <FormErrorMessage>{errors.position.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.activity_time}>
              <FormInput
                label="Tempo de Experiência"
                register={register}
                name="activity_time"
                state={getFieldState('activity_time')}
                placeholder=""
                errors={errors.activity_time}
                defaultValue={state.selectedEmployee?.activity_time}
              />
              {errors.activity_time ? (
                <FormErrorMessage>
                  {errors.activity_time.message}
                </FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </InputColumn>
          <InputColumn>
            <FormControl isInvalid={!!errors.height}>
              <FormInput
                label="Altura (cm)"
                register={register}
                name="height"
                state={getFieldState('height')}
                placeholder=""
                errors={errors.height}
                type="number"
                step={1}
                min={0}
                defaultValue={state.selectedEmployee?.height}
              />
              {errors.height ? (
                <FormErrorMessage>{errors.height.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.weight}>
              <FormInput
                label="Peso (kg)"
                register={register}
                name="weight"
                state={getFieldState('weight')}
                placeholder=""
                errors={errors.weight}
                type="number"
                step={1}
                min={0}
                defaultValue={state.selectedEmployee?.weight}
              />
              {errors.weight ? (
                <FormErrorMessage>{errors.weight.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.imc}>
              <FormInput
                disabled
                label="IMC"
                register={register}
                name="imc"
                state={getFieldState('imc')}
                placeholder=""
                errors={errors.imc}
                defaultValue={state.selectedEmployee?.imc}
              />
              {errors.imc ? (
                <FormErrorMessage>{errors.imc.message}</FormErrorMessage>
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

export default EditEmployee;
