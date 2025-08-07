import React, { useEffect, useState } from 'react';
import { useReports } from '@modules/projects/hooks/reports/index';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { IKinesisEvaluationReport } from '@modules/projects/interfaces/IKinesisEvaluationReport';
import GaugeGraph from '../../../CommonComponents/GaugeGraph';
import FinalPainMap from '../../../CommonComponents/FinalPainMap';
import { Container, GaugesContainer } from './styles';
import PainMap from '../../../CommonComponents/PainMap';

interface KinesisEvaluationContentProps {
  projectId: string;
  currentEvaluationType: EvaluationStageEnum | string;
  prevEvaluationType: EvaluationStageEnum | string;
}

const KinesisEvaluationContent: React.FC<KinesisEvaluationContentProps> = ({
  projectId,
  currentEvaluationType,
  prevEvaluationType,
}) => {
  const { ListKinesisEvaluationsReport } = useReports();

  const { data: kinesisEvaluationReportData } = ListKinesisEvaluationsReport(
    projectId,
    currentEvaluationType,
    prevEvaluationType
  );

  const { data: initialKinesisEvaluationReportData } =
    ListKinesisEvaluationsReport(projectId, EvaluationStageEnum.INITIAL);

  const [reportData, setReportData] = useState<IKinesisEvaluationReport>(
    {} as IKinesisEvaluationReport
  );
  useEffect(() => {
    if (kinesisEvaluationReportData) {
      setReportData(kinesisEvaluationReportData);
    }
  }, [kinesisEvaluationReportData]);

  const [initialReportData, setInitialReportData] =
    useState<IKinesisEvaluationReport>({} as IKinesisEvaluationReport);

  useEffect(() => {
    if (initialKinesisEvaluationReportData) {
      setInitialReportData(initialKinesisEvaluationReportData);
    }
  }, [initialKinesisEvaluationReportData]);

  return (
    <Container>
      <GaugesContainer>
        <GaugeGraph
          title="Operadores com Dor"
          minValue={0}
          maxValue={100}
          value={reportData.current_evaluation?.gauge_chart.has_pain}
          prevResultValue={reportData.prev_evaluation?.gauge_chart.has_pain}
          symbol="%"
        />
        <GaugeGraph
          title="Nível de Dor"
          minValue={0}
          maxValue={10}
          value={reportData.current_evaluation?.gauge_chart.pain_level}
          prevResultValue={reportData.prev_evaluation?.gauge_chart.pain_level}
        />
      </GaugesContainer>
      <FinalPainMap
        title="Dores no Corpo - Grupo de Teste"
        currentPainValues={{
          shoulderPain:
            reportData.current_evaluation?.test_pain_chart.shoulder_pain,
          armsPain: reportData.current_evaluation?.test_pain_chart.arms_pain,
          thighsPain:
            reportData.current_evaluation?.test_pain_chart.thighs_pain,
          kneesPain: reportData.current_evaluation?.test_pain_chart.knees_pain,
          backPain: reportData.current_evaluation?.test_pain_chart.back_pain,
          legsPain: reportData.current_evaluation?.test_pain_chart.legs_pain,
          feetPain: reportData.current_evaluation?.test_pain_chart.feet_pain,
        }}
        prevPainValues={{
          shoulderPain:
            reportData.prev_evaluation?.test_pain_chart.shoulder_pain,
          armsPain: reportData.prev_evaluation?.test_pain_chart.arms_pain,
          thighsPain: reportData.prev_evaluation?.test_pain_chart.thighs_pain,
          kneesPain: reportData.prev_evaluation?.test_pain_chart.knees_pain,
          backPain: reportData.prev_evaluation?.test_pain_chart.back_pain,
          legsPain: reportData.prev_evaluation?.test_pain_chart.legs_pain,
          feetPain: reportData.prev_evaluation?.test_pain_chart.feet_pain,
        }}
      />
      <PainMap
        title="Dores no Corpo - Grupo de Controle"
        shoulderPain={
          initialReportData.current_evaluation?.control_pain_chart.shoulder_pain
        }
        armsPain={
          initialReportData.current_evaluation?.control_pain_chart.arms_pain
        }
        thighsPain={
          initialReportData.current_evaluation?.control_pain_chart.thighs_pain
        }
        kneesPain={
          initialReportData.current_evaluation?.control_pain_chart.knees_pain
        }
        backPain={
          initialReportData.current_evaluation?.control_pain_chart.back_pain
        }
        legsPain={
          initialReportData.current_evaluation?.control_pain_chart.legs_pain
        }
        feetPain={
          initialReportData.current_evaluation?.control_pain_chart.feet_pain
        }
      />
    </Container>
  );
};

export default KinesisEvaluationContent;
