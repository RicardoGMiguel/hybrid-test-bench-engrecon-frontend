import React, { useEffect, useMemo, useState } from 'react';
import { useEvaluations } from '@modules/projects/hooks/evaluations/index';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { IEvaluations } from '@modules/projects/interfaces/IEvaluation';
import EvaluationSelect from '../../CommonComponents/EvaluationSelect';
import { Container, Content, Header } from './styles';
import { EvaluationTypeEnum } from '../../types/EvaluationTypeEnum';
import AutoEvaluationContent from './AutoEvaluationContent';
import KinesisEvaluationContent from './KinesisEvaluationContent';
import SensorsContent from './SensorsContent';
import { IGroupEmployeeItem } from '../../CommonComponents/GroupEmployeeList';

interface RevaluationStepProps {
  projectId: string;
  evaluationStage: EvaluationStageEnum;
  readOnly: boolean;
}

const RevaluationStep: React.FC<RevaluationStepProps> = ({
  projectId,
  evaluationStage,
  readOnly,
}) => {
  const [selectedEvaluationType, setSelectedEvaluationType] =
    useState<EvaluationTypeEnum>(EvaluationTypeEnum.AUTO_EVALUATION);
  const [evaluations, setEvaluations] = useState<IEvaluations>();

  const [
    autoEvaluationDeliveryPercentage,
    setAutoEvaluationDeliveryPercentage,
  ] = useState(0);

  const [
    kinesisEvaluationDeliveryPercentage,
    setKinesisEvaluationDeliveryPercentage,
  ] = useState(0);

  const { ListEvaluations } = useEvaluations();

  const { data: evaluationsData, isLoading } = ListEvaluations(
    projectId,
    evaluationStage
  );

  useEffect(() => {
    if (evaluationsData) {
      setEvaluations(evaluationsData);
    }
  }, [evaluationsData]);

  useEffect(() => {
    if (evaluations) {
      const percentage = (
        (evaluations.auto_evaluation_chart.done /
          evaluations.auto_evaluation_chart.total) *
        100
      ).toFixed(0);
      setAutoEvaluationDeliveryPercentage(Number(percentage));
    }
  }, [evaluations]);

  useEffect(() => {
    if (evaluations) {
      const percentage = (
        (evaluations.kinesis_functional_chart.done /
          evaluations.kinesis_functional_chart.total) *
        100
      ).toFixed(0);
      setKinesisEvaluationDeliveryPercentage(Number(percentage));
    }
  }, [evaluations]);

  const TestEmployees = useMemo(() => {
    if (evaluations) {
      const employeesItems: IGroupEmployeeItem[] =
        evaluations.test_employees?.map((item) => ({
          id: item.id,
          name: item.employee.name,
          employeeEvaluation: item || undefined,
        }));

      return employeesItems;
    }
    return [];
  }, [evaluations]);

  const contentToRender = useMemo(() => {
    if (selectedEvaluationType === EvaluationTypeEnum.AUTO_EVALUATION) {
      return (
        <AutoEvaluationContent
          testEmployees={TestEmployees}
          deliveryPercentage={autoEvaluationDeliveryPercentage}
          isLoading={isLoading}
          evaluationStage={evaluationStage}
          readOnly={readOnly}
        />
      );
    }
    if (selectedEvaluationType === EvaluationTypeEnum.KINESIS_EVALUATION) {
      return (
        <KinesisEvaluationContent
          testEmployees={TestEmployees}
          deliveryPercentage={kinesisEvaluationDeliveryPercentage}
          isLoading={isLoading}
          evaluationStage={evaluationStage}
          readOnly={readOnly}
        />
      );
    }
    if (selectedEvaluationType === EvaluationTypeEnum.SENSORS) {
      return (
        <SensorsContent
          projectId={projectId}
          evaluationStage={evaluationStage}
          readOnly={readOnly}
        />
      );
    }
    return undefined;
  }, [
    TestEmployees,
    autoEvaluationDeliveryPercentage,
    evaluationStage,
    isLoading,
    kinesisEvaluationDeliveryPercentage,
    projectId,
    readOnly,
    selectedEvaluationType,
  ]);

  return (
    <Container>
      <Header>
        <EvaluationSelect
          selectedEvaluationType={selectedEvaluationType}
          changeEvaluationType={(value) => setSelectedEvaluationType(value)}
        />
      </Header>
      <Content>{contentToRender}</Content>
    </Container>
  );
};

export default RevaluationStep;
