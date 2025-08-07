import { useDisclosure } from '@chakra-ui/react';
import Confirmation from '@components/Confirmation';
import { useAuth } from '@modules/auth/hooks/auth/index';
import { useProject } from '@modules/projects/hooks/projects/index';
import { useProjectEmployee } from '@modules/projects/hooks/projectEmployees/index';
import { CreateProjectEmployeeFormData } from '@modules/projects/pages/CreateProjectEmployees/createProjectEmployeeForm.zod';
import React, { useCallback, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import {
  AddProjectEmpoloyeeButton,
  Container,
  CustomEmptyListMessage,
  DeleteButton,
  EmployeeItem,
  ProjectEmployeeHeader,
  ProjectEmployeesContent,
  ProjectsEmployeeTitle,
} from './styles';

interface ProjectEmployeesListProps {
  onAddClick: () => void;
  projectsEmployees: CreateProjectEmployeeFormData;
}

const CreateProjectEmployeesList: React.FC<ProjectEmployeesListProps> = ({
  onAddClick,
  projectsEmployees,
}) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const { user } = useAuth();
  const { selectedCustomerId } = useProject();

  const { setTempCreateProjectEmployees } = useProjectEmployee();

  const [selectedProjectEmployeeId, setSelectedProjectEmployeeId] =
    useState('');

  const handleDeleteTempProjectEmployee = useCallback(() => {
    const currentTempProjectEmployee = { ...projectsEmployees };
    currentTempProjectEmployee.selectedProjectEmployees.splice(
      projectsEmployees.selectedProjectEmployees.findIndex(
        (item) => item.employee.value === selectedProjectEmployeeId
      ),
      1
    );
    setTempCreateProjectEmployees(currentTempProjectEmployee);
  }, [
    projectsEmployees,
    selectedProjectEmployeeId,
    setTempCreateProjectEmployees,
  ]);

  return (
    <>
      <Confirmation
        isOpen={isOpenDelete}
        title="Você tem certeza que deseja remover este colaborador do projeto?"
        confirmButtonLabel="EXCLUIR"
        ConfirmationIcon={FiTrash2}
        onConfirm={() => {
          handleDeleteTempProjectEmployee();
          onCloseDelete();
        }}
        onClose={onCloseDelete}
      />
      <Container>
        <ProjectEmployeeHeader>
          <ProjectsEmployeeTitle>
            Participantes Atribuídos
          </ProjectsEmployeeTitle>
          <AddProjectEmpoloyeeButton
            type="button"
            onClick={onAddClick}
            disabled={
              user.role !== UserRolesEnum.CUSTOMER_ADMIN && !selectedCustomerId
            }
          >
            Atribuir
          </AddProjectEmpoloyeeButton>
        </ProjectEmployeeHeader>
        {projectsEmployees.selectedProjectEmployees?.length ? (
          <ProjectEmployeesContent>
            {projectsEmployees.selectedProjectEmployees.map(
              (projectEmployee) => (
                <EmployeeItem key={projectEmployee.employee.value}>
                  <p>{projectEmployee.employee.label}</p>
                  <DeleteButton
                    onClick={() => {
                      setSelectedProjectEmployeeId(
                        projectEmployee.employee.value
                      );
                      onOpenDelete();
                    }}
                  >
                    <FiTrash2 />
                  </DeleteButton>
                </EmployeeItem>
              )
            )}
          </ProjectEmployeesContent>
        ) : (
          <CustomEmptyListMessage>
            <p>Nenhum colaborador encontrado</p>
          </CustomEmptyListMessage>
        )}
      </Container>
    </>
  );
};

export default CreateProjectEmployeesList;
