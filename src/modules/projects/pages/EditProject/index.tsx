import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDisclosure, FormControl } from '@chakra-ui/react';
import { FiSave, FiTrash2, FiCornerUpLeft } from 'react-icons/fi';
import Button from '@components/Button';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import Confirmation from '@components/Confirmation';
import ProjectFormInput from '@modules/projects/components/ProjectFormInput';
import ProjectFormSelect from '@modules/projects/components/ProjectFormSelect';
import ProjectFormDatePicker from '@modules/projects/components/ProjectFormDatePicker';
import ProjectMultiSelect from '@modules/projects/components/ProjectMultiSelect';
import ProjectEmployeesList from '@modules/projects/components/ProjectEmployeesList';
import { IFormUpdateProject } from '@modules/projects/interfaces/IProject';
import { OptionItem } from '@components/Form/FormSelect';
import { useAuth } from '@modules/auth/hooks/auth/index';
import { useUser } from '@modules/users/hooks/index';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import themeDefaults from '@style/themeDefaults';
import {
  IFormCreateProjectEmployee,
  IProjectEmployeeSendData,
} from '@modules/projects/interfaces/IProjectEmployee';
import { ProjectStatusEnum } from '@modules/projects/types/ProjectStatusEnum';
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
  LeftButtonsContainer,
} from './styles';
import {
  EditProjectFormData,
  editProjectFormResolver,
} from './editProjectForm.zod';
import { EditProjectEmployeeFormData } from '../EditProjectEmployees/editProjectEmployeeForm.zod';

interface IStateProps {
  state: {
    projectId: string;
  };
}

const EditProject: React.FC = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const {
    isOpen: isOpenSoftDelete,
    onOpen: onOpenSoftDelete,
    onClose: onCloseSoftDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenRestore,
    onOpen: onOpenRestore,
    onClose: onCloseRestore,
  } = useDisclosure();

  const {
    isOpen: isOpenReactivateProject,
    onOpen: onOpenReactivateProject,
    onClose: onCloseReactivateProject,
  } = useDisclosure();

  const { state }: IStateProps = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    UpdateProject,
    ShowProject,
    DeleteProject,
    SoftDeleteProject,
    RestoreProject,
    UpdateProjectStatus,
    setSelectedCustomerId,
  } = useProject();
  const {
    ShowProjectEmployees,
    tempEditProjectEmployee,
    setTempEditProjectEmployee,
    UpdateProjectEmployee,
  } = useProjectEmployee();
  const { ListUsers } = useUser();

  const [adminUsersOptions, setAdminUsersOptions] = useState<OptionItem[]>([]);
  const [healthUsersOptions, setHealthUsersOptions] = useState<OptionItem[]>(
    []
  );
  const [viewerUsersOptions, setViewerUsersOptions] = useState<OptionItem[]>(
    []
  );

  useEffect(() => {
    document.title = 'Exy | Edição de Projetos';
  }, []);

  const { data: currentProjectData } = ShowProject(state.projectId);
  const { data: projectEmployeesData } = ShowProjectEmployees(state.projectId);

  const { data: adminUsers } = ListUsers(
    currentProjectData?.customer_id,
    UserRolesEnum.CUSTOMER_ADMIN
  );

  const { data: healthUsers } = ListUsers(undefined, UserRolesEnum.HEALTH);

  const { data: viewerUsers } = ListUsers(
    currentProjectData?.customer_id,
    UserRolesEnum.VIEWER
  );

  const readOnly = useMemo(
    () =>
      user.role === UserRolesEnum.VIEWER ||
      (currentProjectData &&
        (currentProjectData.status === ProjectStatusEnum.DONE ||
          !!currentProjectData.deleted_at)),
    [currentProjectData, user.role]
  );

  const isDeleted = useMemo(
    () => currentProjectData && !!currentProjectData.deleted_at,
    [currentProjectData]
  );

  const {
    getFieldState,
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditProjectFormData>({
    resolver: editProjectFormResolver,
    mode: 'all',
  });

  const watchStartDate = watch('expected_start');
  const watchEndDate = watch('expected_end');

  useEffect(() => {
    if (
      projectEmployeesData &&
      !tempEditProjectEmployee.selectedProjectEmployees
    ) {
      const defaultValues: EditProjectEmployeeFormData = {
        selectedProjectEmployees: projectEmployeesData?.map((item) => ({
          employee: {
            label: item.employee.name,
            value: item.employee.id,
          },
          group: item.equipment
            ? {
                label: 'Teste',
                value: 'Teste',
              }
            : {
                label: 'Controle',
                value: 'Controle',
              },
          equipment: {
            label: item.equipment?.name || undefined,
            value: item.equipment?.id || undefined,
          },
        })),
      };
      setTempEditProjectEmployee(defaultValues);
    }
  }, [
    projectEmployeesData,
    setTempEditProjectEmployee,
    tempEditProjectEmployee.selectedProjectEmployees,
  ]);

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

  const [defaultCustomerAdminOption, setDefaultCustomerAdminOption] = useState<
    OptionItem[]
  >([]);

  const [defaultHealthUsers, setDefaultHealthUsers] = useState<OptionItem[]>(
    []
  );

  const [defaultViewerUsers, setDefaultViewerUsers] = useState<OptionItem[]>(
    []
  );

  useEffect(() => {
    if (currentProjectData) {
      setValue('name', currentProjectData.name);
      setValue('workstation', currentProjectData.workstation);
      setValue('expected_start', new Date(currentProjectData.expected_start));
      setDefaultCustomerAdminOption([
        {
          label: currentProjectData.customer_admin_user.name,
          value: currentProjectData.customer_admin_user.id,
        },
      ]);
      setValue('expected_end', new Date(currentProjectData.expected_end));
      if (currentProjectData.health_users) {
        setDefaultHealthUsers(
          currentProjectData.health_users.map((healthUser) => ({
            label: healthUser.name,
            value: healthUser.id,
          }))
        );
      }
      if (currentProjectData.viewer_users) {
        setDefaultViewerUsers(
          currentProjectData.viewer_users.map((viewerUser) => ({
            label: viewerUser.name,
            value: viewerUser.id,
          }))
        );
      }
    }
  }, [currentProjectData, setValue]);

  const onSubmit = useCallback(
    async (data: EditProjectFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormUpdateProject = {
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
        };

        await UpdateProject({ projectId: state.projectId, data: dataToSend });

        const projectsEmployees: IProjectEmployeeSendData[] =
          tempEditProjectEmployee.selectedProjectEmployees.map((item) => ({
            employee_id: item.employee.value,
            equipment_id: item.equipment.value || null,
          }));

        const projectEmployeeDataToSend: IFormCreateProjectEmployee = {
          project_id: state.projectId,
          project_employees: projectsEmployees,
        };

        await UpdateProjectEmployee(projectEmployeeDataToSend);
        setTempEditProjectEmployee({} as EditProjectEmployeeFormData);

        navigate(PrivatePathsEnum.PROJECTS);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [
      UpdateProject,
      state.projectId,
      tempEditProjectEmployee.selectedProjectEmployees,
      navigate,
      UpdateProjectEmployee,
      setTempEditProjectEmployee,
    ]
  );

  return (
    <>
      <Confirmation
        isOpen={isOpenSoftDelete}
        title="Você tem certeza que deseja excluir este projeto?"
        confirmButtonLabel="EXCLUIR"
        ConfirmationIcon={FiTrash2}
        onConfirm={() => {
          SoftDeleteProject(currentProjectData?.id || '');
          onCloseSoftDelete();
          navigate(PrivatePathsEnum.PROJECTS);
        }}
        onClose={onCloseSoftDelete}
      />
      <Confirmation
        isOpen={isOpenDelete}
        title="Você tem certeza que deseja excluir este projeto em DEFINITIVO?"
        confirmButtonLabel="EXCLUIR"
        ConfirmationIcon={FiTrash2}
        onConfirm={() => {
          DeleteProject(currentProjectData?.id || '');
          onCloseDelete();
          navigate(PrivatePathsEnum.PROJECTS);
        }}
        onClose={onCloseDelete}
      />
      <Confirmation
        isOpen={isOpenRestore}
        title="Você tem certeza que deseja restaurar este projeto?"
        confirmButtonLabel="RESTAURAR"
        ConfirmationIcon={FiCornerUpLeft}
        onConfirm={() => {
          RestoreProject(currentProjectData?.id || '');
          onCloseRestore();
          navigate(PrivatePathsEnum.PROJECTS);
        }}
        onClose={onCloseRestore}
      />
      <Confirmation
        isOpen={isOpenReactivateProject}
        title="Você tem certeza que deseja reativar este projeto?"
        confirmButtonLabel="REATIVAR"
        ConfirmationIcon={FiCornerUpLeft}
        onConfirm={() => {
          UpdateProjectStatus({
            projectId: currentProjectData?.id || '',
            status: ProjectStatusEnum.IN_PROGRES,
          });
          onCloseReactivateProject();
          navigate(PrivatePathsEnum.PROJECTS);
        }}
        onClose={onCloseReactivateProject}
      />
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
                  disabled={readOnly}
                />
                {errors.name ? (
                  <CustomFormErrorMessage>
                    {errors.name.message}
                  </CustomFormErrorMessage>
                ) : (
                  <NoErrorSeparator />
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.workstation}>
                <ProjectFormInput
                  label="Posto de Trabalho Analisado"
                  register={register}
                  name="workstation"
                  state={getFieldState('workstation')}
                  placeholder=""
                  errors={errors.workstation}
                  disabled={readOnly}
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
                  disabled={readOnly}
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
                  disabled={readOnly}
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
              <ProjectEmployeesList
                onAddClick={() => {
                  setSelectedCustomerId(currentProjectData?.customer_id || '');
                  navigate(PrivatePathsEnum.UPDATE_PROJECT_EMPLOYEES);
                }}
                projectsEmployees={tempEditProjectEmployee}
                readOnly={!!readOnly}
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
                  optionsSelected={defaultCustomerAdminOption}
                  disabled={readOnly}
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
                  optionsSelected={defaultHealthUsers}
                  disabled={readOnly}
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
                  optionsSelected={defaultViewerUsers}
                  disabled={readOnly}
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
            <LeftButtonsContainer>
              {user.role === UserRolesEnum.GLOBAL_ADMIN && (
                <Button
                  type="button"
                  label="Excluir em Definitivo"
                  Icon={FiTrash2}
                  backgroundColor={themeDefaults.colors.white}
                  borderColor={themeDefaults.colors.danger}
                  color={themeDefaults.colors.danger}
                  onClick={() => {
                    onOpenDelete();
                  }}
                />
              )}
              {!currentProjectData?.deleted_at && (
                <Button
                  type="button"
                  label="Excluir Projeto"
                  Icon={FiTrash2}
                  disabled={isLoading || user.role === UserRolesEnum.VIEWER}
                  backgroundColor={themeDefaults.colors.white}
                  borderColor={themeDefaults.colors.exyGray}
                  color={
                    user.role !== UserRolesEnum.VIEWER
                      ? themeDefaults.colors.exyGray
                      : themeDefaults.colors.white
                  }
                  onClick={() => {
                    onOpenSoftDelete();
                  }}
                />
              )}
              {user.role === UserRolesEnum.GLOBAL_ADMIN &&
                currentProjectData?.deleted_at && (
                  <Button
                    type="button"
                    label="Restaurar Projeto"
                    Icon={FiCornerUpLeft}
                    backgroundColor={themeDefaults.colors.white}
                    borderColor={themeDefaults.colors.exyGray}
                    color={themeDefaults.colors.exyGray}
                    onClick={() => {
                      onOpenRestore();
                    }}
                  />
                )}
              {currentProjectData?.status === ProjectStatusEnum.DONE && (
                <Button
                  type="button"
                  label="Reativar Projeto"
                  Icon={FiCornerUpLeft}
                  disabled={
                    isDeleted || isLoading || user.role === UserRolesEnum.VIEWER
                  }
                  backgroundColor={themeDefaults.colors.white}
                  borderColor={themeDefaults.colors.exyGray}
                  color={
                    user.role !== UserRolesEnum.VIEWER
                      ? themeDefaults.colors.exyGray
                      : themeDefaults.colors.white
                  }
                  onClick={() => {
                    onOpenReactivateProject();
                  }}
                />
              )}
            </LeftButtonsContainer>
            <Button
              type="submit"
              label="Salvar"
              Icon={FiSave}
              disabled={isSubmitting || isLoading || readOnly}
            />
          </FooterContainer>
        </Content>
      </Container>
    </>
  );
};

export default EditProject;
