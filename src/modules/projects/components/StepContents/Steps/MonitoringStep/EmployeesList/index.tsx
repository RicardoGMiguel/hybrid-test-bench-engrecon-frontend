import React, { useMemo } from 'react';
import LoadingSkeleton from '@components/LoadingSkeleton';
import EmptyListMessage from '@components/EmptyListMessage';
import ListHeader from '@components/List/ListHeader';
import { IList } from '@components/List/interfaces/IList';
import { IShowProject } from '@modules/projects/interfaces/IProject';
import { Container, TitleContainer, Title, List } from './styles';
import { EmployeesListHeaderLabels } from './constants/EmployeesListHeaderLabels';
import EmployeeListItem from './EmployeeListItem';

interface EmployeesListProps {
  title: string;
  isLoading: boolean;
  project: IShowProject;
}

const EmployeesList: React.FC<EmployeesListProps> = ({
  title,
  isLoading,
  project,
}) => {
  const ListToRender = useMemo(() => {
    if (isLoading) {
      return <LoadingSkeleton height={55} />;
    }
    return project.test_employees?.length ? (
      project.test_employees.map((testEmployee) => {
        const info: IList[] = [
          {
            label: testEmployee.employee.name,
          },

          {
            label: testEmployee.equipment.name || '---',
          },
        ];
        return <EmployeeListItem key={testEmployee.id} list={info} />;
      })
    ) : (
      <EmptyListMessage message="Nenhum colaborador encontrado" fontSize={1} />
    );
  }, [isLoading, project.test_employees]);

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <ListHeader headerList={EmployeesListHeaderLabels} actionsGapWidth={0} />
      <List>{ListToRender}</List>
    </Container>
  );
};

export default EmployeesList;
