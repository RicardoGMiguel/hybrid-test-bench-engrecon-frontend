import LoadingSkeleton from '@components/LoadingSkeleton';
import { useAttendanceList } from '@modules/projects/hooks/attendanceLists/index';
import {
  IAttendanceList,
  IFormUpdateAttendanceList,
} from '@modules/projects/interfaces/IAttendanceLists';
import { IShowProject } from '@modules/projects/interfaces/IProject';
import React, { useCallback, useMemo, useState } from 'react';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';
import AddAttendanceFileButton from '../AddAttendanceFileButton';
import {
  AttendanceButton,
  ButtonsContainer,
  Container,
  Content,
  CustomEmptyListMessage,
  EmployeeItem,
  Header,
  IconButton,
  Title,
} from './styles';

interface AttendanceListProps {
  project: IShowProject;
  attendanceListData: IAttendanceList;
  isLoading: boolean;
  readOnly: boolean;
}

const AttendanceList: React.FC<AttendanceListProps> = ({
  project,
  attendanceListData,
  isLoading,
  readOnly,
}) => {
  const { UpdateAttendanceList } = useAttendanceList();
  const [isEditing, setIsEditing] = useState(false);

  const initialUpdateAttendanceData = useCallback(() => {
    const dataToReturn: IFormUpdateAttendanceList = {
      absent_project_employee_ids: [],
      present_project_employee_ids: [],
    };
    if (attendanceListData.test_employees) {
      attendanceListData.test_employees.forEach((testEmployee) => {
        if (testEmployee.is_present) {
          dataToReturn.present_project_employee_ids.push(testEmployee.id);
        } else {
          dataToReturn.absent_project_employee_ids.push(testEmployee.id);
        }
      });
    }
    return dataToReturn;
  }, [attendanceListData.test_employees]);

  const [updateAttendanceListData, setUpdateAttendanceListData] =
    useState<IFormUpdateAttendanceList>(initialUpdateAttendanceData());

  const handleClickAttendanceButton = useCallback(
    (projectEmployeeId: string) => {
      const tempData = { ...updateAttendanceListData };
      const employeeIdAdded =
        updateAttendanceListData.present_project_employee_ids?.find(
          (employeeId) => employeeId === projectEmployeeId
        );

      if (employeeIdAdded) {
        const indexToRemove = tempData.present_project_employee_ids.findIndex(
          (id) => id === projectEmployeeId
        );
        tempData.present_project_employee_ids.splice(indexToRemove, 1);
        tempData.absent_project_employee_ids.push(projectEmployeeId);
      } else {
        const indexToRemove = tempData.absent_project_employee_ids.findIndex(
          (id) => id === projectEmployeeId
        );
        tempData.absent_project_employee_ids.splice(indexToRemove, 1);
        tempData.present_project_employee_ids.push(projectEmployeeId);
      }

      setUpdateAttendanceListData(tempData);
    },
    [updateAttendanceListData]
  );

  const buttonsToRender = useMemo(() => {
    if (isEditing) {
      return (
        <>
          <IconButton
            onClick={() => {
              setIsEditing(false);
              setUpdateAttendanceListData(initialUpdateAttendanceData());
            }}
          >
            <FiX size={26} />
          </IconButton>
          <IconButton
            onClick={() => {
              UpdateAttendanceList({
                projectId: project.id,
                data: updateAttendanceListData,
              });
              setIsEditing(false);
            }}
          >
            <FiSave />
          </IconButton>
        </>
      );
    }

    return (
      <IconButton
        onClick={() => {
          setIsEditing(true);
          setUpdateAttendanceListData(initialUpdateAttendanceData());
        }}
      >
        <FiEdit size={26} />
      </IconButton>
    );
  }, [
    UpdateAttendanceList,
    initialUpdateAttendanceData,
    isEditing,
    project.id,
    updateAttendanceListData,
  ]);

  const contentToRender = useMemo(() => {
    if (!isLoading) {
      if (attendanceListData.test_employees?.length) {
        return (
          <Content>
            {attendanceListData.test_employees.map((employee) => (
              <EmployeeItem key={employee.id}>
                <p>{employee.employee.name}</p>
                <AttendanceButton
                  isEditing={isEditing}
                  isSelected={
                    isEditing
                      ? !!updateAttendanceListData.present_project_employee_ids.find(
                          (id) => id === employee.id
                        )
                      : employee.is_present
                  }
                  onClick={() => handleClickAttendanceButton(employee.id)}
                />
              </EmployeeItem>
            ))}
          </Content>
        );
      }
      return (
        <CustomEmptyListMessage>
          <p>Nenhum colaborador encontrado</p>
        </CustomEmptyListMessage>
      );
    }

    return <LoadingSkeleton />;
  }, [
    attendanceListData.test_employees,
    handleClickAttendanceButton,
    isEditing,
    isLoading,
    updateAttendanceListData.present_project_employee_ids,
  ]);

  return (
    <Container>
      <Header>
        <Title>Presença do Grupo de Teste</Title>

        <ButtonsContainer>
          {!readOnly && buttonsToRender}
          <AddAttendanceFileButton
            readOnly={readOnly}
            label={
              !readOnly ? 'Upload de lista de presença' : 'Lista de presença'
            }
            project={project}
          />
        </ButtonsContainer>
      </Header>
      {contentToRender}
    </Container>
  );
};

export default AttendanceList;
