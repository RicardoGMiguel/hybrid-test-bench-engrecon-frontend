import React, { useMemo } from 'react';
import LoadingSkeleton from '@components/LoadingSkeleton';
import EmptyListMessage from '@components/EmptyListMessage';
import ListHeader from '@components/List/ListHeader';
import { IShowProject } from '@modules/projects/interfaces/IProject';
import { Container, TitleContainer, Title, List } from './styles';
import { WeekMonitoringListHeaderLabels } from './constants/WeekMonitoringListHeaderLabels';
import WeekMonitoringListItem from './WeekMonitoringListItem';
import { WeekMonitoringEnum } from '../../../types/WeekMonitoringEnum';

interface WeekMOnitoringListProps {
  title: string;
  isLoading: boolean;
  project: IShowProject;
  week: WeekMonitoringEnum;
  readOnly: boolean;
}

const WeekMOnitoringList: React.FC<WeekMOnitoringListProps> = ({
  title,
  isLoading,
  project,
  week,
  readOnly,
}) => {
  const ListToRender = useMemo(() => {
    if (isLoading) {
      return <LoadingSkeleton height={55} />;
    }
    return project.test_employees?.length ? (
      project.test_employees.map((testEmployee) => (
        <WeekMonitoringListItem
          key={testEmployee.id}
          name={testEmployee.employee.name}
          week={week}
          projectEmployeeId={testEmployee.id}
          readOnly={readOnly}
        />
      ))
    ) : (
      <EmptyListMessage message="Nenhum colaborador encontrado" fontSize={1} />
    );
  }, [isLoading, project.test_employees, readOnly, week]);

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <ListHeader
        headerList={WeekMonitoringListHeaderLabels}
        actionsGapWidth={0}
      />
      <List>{ListToRender}</List>
    </Container>
  );
};

export default WeekMOnitoringList;
