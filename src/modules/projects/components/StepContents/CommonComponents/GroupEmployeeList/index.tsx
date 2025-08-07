import React, { useMemo } from 'react';
import LoadingSkeleton from '@components/LoadingSkeleton';
import EmptyListMessage from '@components/EmptyListMessage';
import { IEmployeeEvaluation } from '@modules/projects/interfaces/IEvaluation';
import GroupEmployeeItem from './GroupEmployeeItem';

import { Container, Title, List } from './styles';
import { EvaluationTypeEnum } from '../../types/EvaluationTypeEnum';

export interface IGroupEmployeeItem {
  id: string;
  name: string;
  employeeEvaluation?: IEmployeeEvaluation;
}
interface GroupEmployeeListProps {
  title: string;
  isLoading: boolean;
  showHideNameButton: boolean;
  showAnswerButton: boolean;
  showEditButton: boolean;
  onClickAnswerButton?: (employee: IGroupEmployeeItem) => void;
  onClickEditButton?: (employee: IGroupEmployeeItem) => void;
  employeees: IGroupEmployeeItem[];
  evaluationType?: EvaluationTypeEnum;
}

const GroupEmployeeList: React.FC<GroupEmployeeListProps> = ({
  title,
  employeees,
  isLoading,
  showHideNameButton,
  showAnswerButton,
  showEditButton,
  onClickAnswerButton,
  onClickEditButton,
  evaluationType,
}) => {
  const ListToRender = useMemo(() => {
    if (isLoading) {
      return <LoadingSkeleton height={55} />;
    }
    return employeees?.length ? (
      employeees.map((employee, index) => {
        let itemEvaluation;

        if (evaluationType === EvaluationTypeEnum.AUTO_EVALUATION)
          itemEvaluation = employee.employeeEvaluation?.auto_evaluation;

        if (evaluationType === EvaluationTypeEnum.KINESIS_EVALUATION)
          itemEvaluation =
            employee.employeeEvaluation?.kinesis_functional_evaluation;

        return (
          <GroupEmployeeItem
            key={employee.id}
            name={employee.name}
            hiddenName={`Funcionário ${index + 1}`}
            showHideNameButton={showHideNameButton}
            showAnswerButton={showAnswerButton && !itemEvaluation}
            onClickAnswerButton={
              onClickAnswerButton
                ? () => {
                    onClickAnswerButton(employee);
                  }
                : undefined
            }
            showEditButton={showEditButton && !!itemEvaluation}
            onClickEditButton={
              onClickEditButton
                ? () => {
                    onClickEditButton(employee);
                  }
                : undefined
            }
          />
        );
      })
    ) : (
      <EmptyListMessage message="Nenhum colaborador encontrado" fontSize={1} />
    );
  }, [
    employeees,
    evaluationType,
    isLoading,
    onClickAnswerButton,
    onClickEditButton,
    showAnswerButton,
    showEditButton,
    showHideNameButton,
  ]);

  return (
    <Container>
      <Title>{title}</Title>
      <List>{ListToRender}</List>
    </Container>
  );
};

export default GroupEmployeeList;
