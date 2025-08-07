import React, { useMemo, useState } from 'react';
import EvaluationSelect from '../../CommonComponents/EvaluationSelect';
import AutoEvaluationContent from './AutoEvaluationContent';
import KinesisEvaluationContent from './KinesisEvaluationContent';
import SensorsContent from './SensorsContent';
import { Container, Content, Header } from './styles';
import { EvaluationTypeEnum } from '../../types/EvaluationTypeEnum';

interface InitialReportStepProps {
  projectId: string;
}

const InitialReportStep: React.FC<InitialReportStepProps> = ({ projectId }) => {
  const [selectedEvaluationType, setSelectedEvaluationType] =
    useState<EvaluationTypeEnum>(EvaluationTypeEnum.AUTO_EVALUATION);

  const contentToRender = useMemo(() => {
    if (selectedEvaluationType === EvaluationTypeEnum.AUTO_EVALUATION) {
      return <AutoEvaluationContent projectId={projectId} />;
    }
    if (selectedEvaluationType === EvaluationTypeEnum.KINESIS_EVALUATION) {
      return <KinesisEvaluationContent projectId={projectId} />;
    }
    if (selectedEvaluationType === EvaluationTypeEnum.SENSORS) {
      return <SensorsContent projectId={projectId} />;
    }
    return undefined;
  }, [projectId, selectedEvaluationType]);

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

export default InitialReportStep;
