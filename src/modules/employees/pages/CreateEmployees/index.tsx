import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Title from '@components/Title';
import FormInput from '@components/Form/FormInput';
import Button from '@components/Button';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { IFormCreateEmployee } from '@modules/employees/interfaces/IEmployee';
import FormSelect, { OptionItem } from '@components/Form/FormSelect';
import FormDatePicker from '@components/Form/FormDatePicker';
import { TranslateGenderToPT } from '@modules/employees/utils/translateGenderToPT';
import { GenderEnum } from '@modules/employees/types/GenderEnum';
import { TranslateGenderToEN } from '@modules/employees/utils/translateGenderToEN';
import { useAuth } from '@modules/auth/hooks/auth/index';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import { useCustomer } from '@modules/customers/hooks/index';
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
  CreateEmployeeFormData,
  createEmployeeFormResolver,
} from './createEmployeeForm.zod';

const CreateEmployees: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { ListCustomers } = useCustomer();

  const [isLoading, setIsLoading] = useState(false);
  const { CreateEmployee } = useEmployee();

  const [customersOptions, setCustomersOptions] = useState<OptionItem[]>([]);

  const { data: customersData } = ListCustomers(
    user.role === UserRolesEnum.CUSTOMER_ADMIN
  );

  useEffect(() => {
    document.title = 'Exy | Cadastro de Colaboradores';
  }, []);

  const {
    getFieldState,
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<CreateEmployeeFormData>({
    resolver: createEmployeeFormResolver(user.role),
    mode: 'all',
  });

  const onSubmit = useCallback(
    async (data: CreateEmployeeFormData) => {
      try {
        setIsLoading(true);

        const newData = { ...data };

        delete newData.imc;

        const dataToSend: IFormCreateEmployee = {
          ...newData,
          gender: TranslateGenderToEN(data.gender.value),
          height: Number(data.height),
          weight: Number(data.weight),
          customer_id: data.customer_id?.value,
        };

        await CreateEmployee(dataToSend);

        navigate(PrivatePathsEnum.EMPLOYEES);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [CreateEmployee, navigate]
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
  }, [heightWatch, setValue, weightWatch]);

  useEffect(() => {
    if (customersData) {
      const options: OptionItem[] = customersData.map((customer) => ({
        label: customer.name,
        value: customer.id,
      }));

      setCustomersOptions(options);
    }
  }, [customersData]);

  return (
    <Container>
      <Header>
        <div>
          <Title value="Cadastro de Colaboradores" />
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
            <FormControl isInvalid={!!errors.gender}>
              <FormSelect
                label="Sexo"
                control={control}
                name="gender"
                placeholder="Selecione um gênero"
                options={genderOptions}
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
              />
              {errors.imc ? (
                <FormErrorMessage>{errors.imc.message}</FormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </InputColumn>
          <InputColumn>
            {user.role !== UserRolesEnum.CUSTOMER_ADMIN && (
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

export default CreateEmployees;
