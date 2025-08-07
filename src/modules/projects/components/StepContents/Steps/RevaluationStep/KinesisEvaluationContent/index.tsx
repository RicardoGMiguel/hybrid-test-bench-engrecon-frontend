import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { IEmployeeEvaluation } from '@modules/projects/interfaces/IEvaluation';
import { Container, ContentItem, GraphContainer } from './styles';
import GroupEmployeeList, {
  IGroupEmployeeItem,
} from '../../../CommonComponents/GroupEmployeeList';
import StatusGraph from '../../../CommonComponents/StatusGraph';
import CreateKinesisEvaluationModal from '../../../CommonComponents/KinesisEvaluationModals/CreateKinesisEvaluationModal';
import EditKinesisEvaluationModal from '../../../CommonComponents/KinesisEvaluationModals/EditKinesisEvaluationModal';
import { EvaluationTypeEnum } from '../../../types/EvaluationTypeEnum';

interface KinesisEvaluationContentProps {
  testEmployees: IGroupEmployeeItem[];
  deliveryPercentage: number;
  isLoading: boolean;
  evaluationStage: EvaluationStageEnum;
  readOnly: boolean;
}

const KinesisEvaluationContent: React.FC<KinesisEvaluationContentProps> = ({
  testEmployees,
  deliveryPercentage,
  isLoading,
  evaluationStage,
  readOnly,
}) => {
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();

  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

  const [selectedEmployeeEvaluation, setSelectedEmployeeEvaluation] = useState<
    IEmployeeEvaluation | undefined
  >({} as IEmployeeEvaluation);

  return (
    <>
      {selectedEmployeeEvaluation && (
        <>
          <CreateKinesisEvaluationModal
            employeeEvaluation={selectedEmployeeEvaluation}
            isOpen={isOpenCreateModal}
            onClose={onCloseCreateModal}
            evaluationStage={evaluationStage}
          />
          <EditKinesisEvaluationModal
            employeeEvaluation={selectedEmployeeEvaluation}
            isOpen={isOpenEditModal}
            onClose={onCloseEditModal}
            readOnly={readOnly}
          />
        </>
      )}

      <Container>
        <ContentItem>
          <GroupEmployeeList
            title="Grupo de Teste"
            employeees={testEmployees}
            isLoading={isLoading}
            showHideNameButton
            showAnswerButton
            showEditButton
            evaluationType={EvaluationTypeEnum.KINESIS_EVALUATION}
            onClickAnswerButton={
              !readOnly
                ? (employee) => {
                    setSelectedEmployeeEvaluation(employee.employeeEvaluation);
                    onOpenCreateModal();
                  }
                : undefined
            }
            onClickEditButton={(employee) => {
              setSelectedEmployeeEvaluation(employee.employeeEvaluation);
              onOpenEditModal();
            }}
          />
        </ContentItem>
        <GraphContainer>
          <StatusGraph
            title="Status de Entrega"
            label1="Entregue"
            value1={deliveryPercentage}
            label2="Pendente"
            value2={100 - deliveryPercentage}
            legendDirection="column"
          />
        </GraphContainer>
      </Container>
    </>
  );
};

export default KinesisEvaluationContent;
