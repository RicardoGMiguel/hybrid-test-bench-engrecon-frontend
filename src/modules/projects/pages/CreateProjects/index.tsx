import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormControl } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Button from '@components/Button';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import ProjectFormInput from '@modules/projects/components/ProjectFormInput';
import ProjectFormSelect from '@modules/projects/components/ProjectFormSelect';
import ProjectFormDatePicker from '@modules/projects/components/ProjectFormDatePicker';
import ProjectMultiSelect from '@modules/projects/components/ProjectMultiSelect';
import CreateProjectEmployeesList from '@modules/projects/components/CreateProjectEmployeesList';
import { IFormCreateProject } from '@modules/projects/interfaces/IProject';
import { OptionItem } from '@components/Form/FormSelect';
import { useAuth } from '@modules/auth/hooks/auth/index';
import { useCustomer } from '@modules/customers/hooks/index';
import { useUser } from '@modules/users/hooks/index';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import {
  IFormCreateProjectEmployee,
  IProjectEmployeeSendData,
} from '@modules/projects/interfaces/IProjectEmployee';
import { useProject } from '../../hooks/projects/index';
import { useProjectEmployee } from '../../hooks/projectEmployees/index';
import {
  Container,
  Content,
  FirstFormContainer,
  FirstForm,
  SecondFormContainer,
  ProjectEmployeesContainer,
  SecondForm,
  FooterContainer,
  NoErrorSeparator,
  CustomFormErrorMessage,
} from './styles';
import {
  CreateProjectFormData,
  createProjectFormResolver,
} from './createProjectForm.zod';
import { CreateProjectEmployeeFormData } from '../CreateProjectEmployees/createProjectEmployeeForm.zod';

const CreateProjects: React.FC = () => {
  const navigate = useNavigate();

  const { user: loggedUser } = useAuth();

  const { ListCustomers } = useCustomer();

  const [isLoading, setIsLoading] = useState(false);
  const {
    CreateProject,
    tempCreateProjectData,
    setTempCreateProjectData,
    selectedCustomerId,
    setSelectedCustomerId,
  } = useProject();
  const { ListUsers } = useUser();
  const {
    tempCreateProjectEmployees,
    CreateProjectEmployee,
    setTempCreateProjectEmployees,
  } = useProjectEmployee();

  const [customersOptions, setCustomersOptions] = useState<OptionItem[]>([]);

  const [adminUsersOptions, setAdminUsersOptions] = useState<OptionItem[]>([]);
  const [healthUsersOptions, setHealthUsersOptions] = useState<OptionItem[]>(
    []
  );
  const [viewerUsersOptions, setViewerUsersOptions] = useState<OptionItem[]>(
    []
  );

  useEffect(() => {
    document.title = 'Exy | Cadastro de Projetos';
  }, []);

  const { data: adminUsers } = ListUsers(
    selectedCustomerId,
    UserRolesEnum.CUSTOMER_ADMIN
  );

  const { data: healthUsers } = ListUsers(undefined, UserRolesEnum.HEALTH);

  const { data: viewerUsers } = ListUsers(
    selectedCustomerId,
    UserRolesEnum.VIEWER
  );

  const { data: customersData } = ListCustomers(
    loggedUser.role === UserRolesEnum.CUSTOMER_ADMIN
  );

  const {
    getFieldState,
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: createProjectFormResolver(loggedUser.role),
    mode: 'all',
    defaultValues: tempCreateProjectData || {},
  });

  const watchStartDate = watch('expected_start');
  const watchEndDate = watch('expected_end');
  const watchCustomer = watch('customer_id');

  useEffect(() => {
    if (
      watchCustomer?.value &&
      loggedUser.role !== UserRolesEnum.CUSTOMER_ADMIN
    ) {
      setSelectedCustomerId(watchCustomer.value);
    } else {
      setSelectedCustomerId(undefined);
    }
  }, [
    loggedUser.role,
    selectedCustomerId,
    setSelectedCustomerId,
    watchCustomer?.value,
  ]);

  useEffect(() => {
    if (watchCustomer?.value && watchCustomer?.value !== selectedCustomerId) {
      setValue('customer_admin_user_id', { value: '', label: '' });
      setValue('viewer_users_id', []);
      setTempCreateProjectEmployees({} as CreateProjectEmployeeFormData);
    }
  }, [
    selectedCustomerId,
    setTempCreateProjectEmployees,
    setValue,
    watchCustomer?.value,
  ]);

  useEffect(() => {
    if (customersData) {
      const options: OptionItem[] = customersData.map((customer) => ({
        label: customer.name,
        value: customer.id,
      }));

      setCustomersOptions(options);
    }
  }, [customersData]);

  useEffect(() => {
    if (adminUsers) {
      const options: OptionItem[] = adminUsers.map((adminUser) => ({
        label: adminUser.name,
        value: adminUser.id,
      }));

      setAdminUsersOptions(options);
    }
  }, [adminUsers]);

  useEffect(() => {
    if (healthUsers) {
      const options: OptionItem[] = healthUsers.map((healthUser) => ({
        label: healthUser.name,
        value: healthUser.id,
      }));

      setHealthUsersOptions(options);
    }
  }, [healthUsers]);

  useEffect(() => {
    if (viewerUsers) {
      const options: OptionItem[] = viewerUsers.map((viewerUser) => ({
        label: viewerUser.name,
        value: viewerUser.id,
      }));

      setViewerUsersOptions(options);
    }
  }, [viewerUsers]);

  const onSubmit = useCallback(
    async (data: CreateProjectFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormCreateProject = {
          ...data,
          expected_start: data.expected_start,
          expected_end: data.expected_end,
          customer_admin_user_id: data.customer_admin_user_id.value,
          health_users_id: data.health_users_id
            ? data.health_users_id.map((healthUser) => healthUser.value)
            : [],
          viewer_users_id: data.viewer_users_id
            ? data.viewer_users_id.map((viewerUser) => viewerUser.value)
            : [],
          type: 'TEST',
          customer_id: data.customer_id?.value,
        };

        const newProject = await CreateProject(dataToSend);

        if (
          tempCreateProjectEmployees.selectedProjectEmployees &&
          tempCreateProjectEmployees.selectedProjectEmployees.length
        ) {
          const projectsEmployees: IProjectEmployeeSendData[] =
            tempCreateProjectEmployees.selectedProjectEmployees.map((item) => ({
              employee_id: item.employee.value,
              equipment_id: item.equipment.value || undefined,
            }));

          const projectEmployeeDataToSend: IFormCreateProjectEmployee = {
            project_id: newProject.id,
            project_employees: projectsEmployees,
          };
          await CreateProjectEmployee(projectEmployeeDataToSend);
          setTempCreateProjectEmployees({} as CreateProjectEmployeeFormData);
        }

        setTempCreateProjectData({} as CreateProjectFormData);
        navigate(PrivatePathsEnum.PROJECTS);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [
      CreateProject,
      CreateProjectEmployee,
      navigate,
      setTempCreateProjectData,
      setTempCreateProjectEmployees,
      tempCreateProjectEmployees.selectedProjectEmployees,
    ]
  );

  return (
    <Container>
      <Content onSubmit={handleSubmit(onSubmit)}>
        <FirstFormContainer>
          <FirstForm>
            <FormControl isInvalid={!!errors.name}>
              <ProjectFormInput
                label="Nome do Projeto"
                register={register}
                name="name"
                state={getFieldState('name')}
                placeholder=""
                errors={errors.name}
              />
              {errors.name ? (
                <CustomFormErrorMessage>
                  {errors.name.message}
                </CustomFormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            {loggedUser.role !== UserRolesEnum.CUSTOMER_ADMIN && (
              <FormControl isInvalid={!!errors.customer_id}>
                <ProjectFormSelect
                  label="Empresa"
                  control={control}
                  name="customer_id"
                  placeholder="Selecione uma empresa"
                  options={customersOptions}
                />
                {errors.customer_id ? (
                  <CustomFormErrorMessage>
                    {errors.customer_id.message}
                  </CustomFormErrorMessage>
                ) : (
                  <NoErrorSeparator />
                )}
              </FormControl>
            )}
            <FormControl isInvalid={!!errors.workstation}>
              <ProjectFormInput
                label="Posto de Trabalho Analisado"
                register={register}
                name="workstation"
                state={getFieldState('workstation')}
                placeholder=""
                errors={errors.workstation}
              />
              {errors.workstation ? (
                <CustomFormErrorMessage>
                  {errors.workstation.message}
                </CustomFormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.expected_start} width="85%">
              <ProjectFormDatePicker
                control={control}
                label="Data de Início Previsto"
                register={register}
                name="expected_start"
                state={getFieldState('expected_start')}
                placeholder="Selecione uma data..."
                errors={errors.expected_start}
                minDate={new Date(Date.now())}
                maxDate={watchEndDate || undefined}
              />
              {errors.expected_start ? (
                <CustomFormErrorMessage>
                  {errors.expected_start.message}
                </CustomFormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.expected_end} width="85%">
              <ProjectFormDatePicker
                control={control}
                label="Data de Encerramento Previsto"
                register={register}
                name="expected_end"
                state={getFieldState('expected_end')}
                placeholder="Selecione uma data..."
                errors={errors.expected_end}
                minDate={watchStartDate || new Date(Date.now())}
              />
              {errors.expected_end ? (
                <CustomFormErrorMessage>
                  {errors.expected_end.message}
                </CustomFormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </FirstForm>
        </FirstFormContainer>
        <SecondFormContainer>
          <ProjectEmployeesContainer>
            <CreateProjectEmployeesList
              onAddClick={() => {
                setTempCreateProjectData(getValues());
                navigate(PrivatePathsEnum.CREATE_PROJECT_EMPLOYEES);
              }}
              projectsEmployees={tempCreateProjectEmployees}
            />
          </ProjectEmployeesContainer>
          <SecondForm>
            <FormControl isInvalid={!!errors.customer_admin_user_id}>
              <ProjectFormSelect
                label="Especialista Responsável"
                control={control}
                name="customer_admin_user_id"
                placeholder="Selecione um responsável"
                options={adminUsersOptions}
                disabled={
                  loggedUser.role !== UserRolesEnum.CUSTOMER_ADMIN &&
                  !selectedCustomerId
                }
              />
              {errors.customer_admin_user_id ? (
                <CustomFormErrorMessage>
                  {errors.customer_admin_user_id.message}
                </CustomFormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.health_users_id}>
              <ProjectMultiSelect
                control={control}
                name="health_users_id"
                label="Equipe Saúde Responsável"
                options={healthUsersOptions}
              />
              {errors.health_users_id ? (
                <CustomFormErrorMessage>
                  {errors.health_users_id.message}
                </CustomFormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.viewer_users_id}>
              <ProjectMultiSelect
                control={control}
                name="viewer_users_id"
                label="Equipe Apoio Responsável"
                options={viewerUsersOptions}
                disabled={
                  loggedUser.role !== UserRolesEnum.CUSTOMER_ADMIN &&
                  !selectedCustomerId
                }
              />
              {errors.viewer_users_id ? (
                <CustomFormErrorMessage>
                  {errors.viewer_users_id.message}
                </CustomFormErrorMessage>
              ) : (
                <NoErrorSeparator />
              )}
            </FormControl>
          </SecondForm>
        </SecondFormContainer>
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

export default CreateProjects;
