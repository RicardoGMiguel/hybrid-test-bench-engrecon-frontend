import React, { useEffect, useState } from 'react';
import { useReports } from '@modules/projects/hooks/reports/index';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { IKinesisEvaluationReport } from '@modules/projects/interfaces/IKinesisEvaluationReport';
import GaugeGraph from '../../../CommonComponents/GaugeGraph';
import PainMap from '../../../CommonComponents/PainMap';
import { Container, GaugesContainer } from './styles';

interface KinesisEvaluationContentProps {
  projectId: string;
}

const KinesisEvaluationContent: React.FC<KinesisEvaluationContentProps> = ({
  projectId,
}) => {
  const { ListKinesisEvaluationsReport } = useReports();

  const { data: kinesisEvaluationReportData } = ListKinesisEvaluationsReport(
    projectId,
    EvaluationStageEnum.INITIAL
  );

  const [reportData, setReportData] = useState<IKinesisEvaluationReport>(
    {} as IKinesisEvaluationReport
  );

  useEffect(() => {
    if (kinesisEvaluationReportData) {
      setReportData(kinesisEvaluationReportData);
    }
  }, [kinesisEvaluationReportData]);
  return (
    <Container>
      <GaugesContainer>
        <GaugeGraph
          title="Operadores com Dor"
          minValue={0}
          maxValue={100}
          value={reportData.current_evaluation?.gauge_chart.has_pain}
          symbol="%"
        />
        <GaugeGraph
          title="Nível de Dor"
          minValue={0}
          maxValue={10}
          value={reportData.current_evaluation?.gauge_chart.pain_level}
        />
      </GaugesContainer>
      <PainMap
        title="Dores no Corpo - Grupo de Teste"
        shoulderPain={
          reportData.current_evaluation?.test_pain_chart.shoulder_pain
        }
        armsPain={reportData.current_evaluation?.test_pain_chart.arms_pain}
        thighsPain={reportData.current_evaluation?.test_pain_chart.thighs_pain}
        kneesPain={reportData.current_evaluation?.test_pain_chart.knees_pain}
        backPain={reportData.current_evaluation?.test_pain_chart.back_pain}
        legsPain={reportData.current_evaluation?.test_pain_chart.legs_pain}
        feetPain={reportData.current_evaluation?.test_pain_chart.feet_pain}
      />
      <PainMap
        title="Dores no Corpo - Grupo de Controle"
        shoulderPain={
          reportData.current_evaluation?.control_pain_chart.shoulder_pain
        }
        armsPain={reportData.current_evaluation?.control_pain_chart.arms_pain}
        thighsPain={
          reportData.current_evaluation?.control_pain_chart.thighs_pain
        }
        kneesPain={reportData.current_evaluation?.control_pain_chart.knees_pain}
        backPain={reportData.current_evaluation?.control_pain_chart.back_pain}
        legsPain={reportData.current_evaluation?.control_pain_chart.legs_pain}
        feetPain={reportData.current_evaluation?.control_pain_chart.feet_pain}
      />
    </Container>
  );
};

export default KinesisEvaluationContent;
