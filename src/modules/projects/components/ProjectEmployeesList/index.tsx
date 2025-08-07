import { useDisclosure } from '@chakra-ui/react';
import Confirmation from '@components/Confirmation';
import { EditProjectEmployeeFormData } from '@modules/projects/pages/EditProjectEmployees/editProjectEmployeeForm.zod';
import React, { useCallback, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useProjectEmployee } from '../../hooks/projectEmployees/index';
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
  projectsEmployees: EditProjectEmployeeFormData;
  readOnly: boolean;
}

const ProjectEmployeesList: React.FC<ProjectEmployeesListProps> = ({
  onAddClick,
  projectsEmployees,
  readOnly,
}) => {
  const { setTempEditProjectEmployee } = useProjectEmployee();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

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
    setTempEditProjectEmployee(currentTempProjectEmployee);
  }, [
    projectsEmployees,
    selectedProjectEmployeeId,
    setTempEditProjectEmployee,
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
          {!readOnly && (
            <AddProjectEmpoloyeeButton type="button" onClick={onAddClick}>
              Atribuir
            </AddProjectEmpoloyeeButton>
          )}
        </ProjectEmployeeHeader>
        {projectsEmployees.selectedProjectEmployees?.length ? (
          <ProjectEmployeesContent>
            {projectsEmployees.selectedProjectEmployees.map(
              (projectEmployee) => (
                <EmployeeItem key={projectEmployee.employee.value}>
                  <p>{projectEmployee.employee.label}</p>
                  {!readOnly && (
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
                  )}
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

export default ProjectEmployeesList;
