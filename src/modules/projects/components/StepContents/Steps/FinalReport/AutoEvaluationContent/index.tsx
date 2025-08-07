import React, { useEffect, useState } from 'react';
import { useReports } from '@modules/projects/hooks/reports/index';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { IAutoEvaluationReport } from '@modules/projects/interfaces/IAutoEvaluationReport';
import GaugeGraph from '../../../CommonComponents/GaugeGraph';
import FinalPainMap from '../../../CommonComponents/FinalPainMap';
import { Container, GaugesContainer } from './styles';
import PainMap from '../../../CommonComponents/PainMap';

interface AutoEvaluationContentProps {
  projectId: string;
  currentEvaluationType: EvaluationStageEnum | string;
  prevEvaluationType: EvaluationStageEnum | string;
}

const AutoEvaluationContent: React.FC<AutoEvaluationContentProps> = ({
  projectId,
  currentEvaluationType,
  prevEvaluationType,
}) => {
  const { ListAutoEvaluationsReport } = useReports();

  const { data: autoEvaluationReportData } = ListAutoEvaluationsReport(
    projectId,
    currentEvaluationType,
    prevEvaluationType
  );

  const { data: initialAutoEvaluationReportData } = ListAutoEvaluationsReport(
    projectId,
    EvaluationStageEnum.INITIAL
  );

  const [reportData, setReportData] = useState<IAutoEvaluationReport>(
    {} as IAutoEvaluationReport
  );
  useEffect(() => {
    if (autoEvaluationReportData) {
      setReportData(autoEvaluationReportData);
    }
  }, [autoEvaluationReportData]);

  const [initialReportData, setInitialReportData] =
    useState<IAutoEvaluationReport>({} as IAutoEvaluationReport);

  useEffect(() => {
    if (initialAutoEvaluationReportData) {
      setInitialReportData(initialAutoEvaluationReportData);
    }
  }, [initialAutoEvaluationReportData]);

  return (
    <Container>
      <GaugesContainer>
        <GaugeGraph
          title="Média de Esforço"
          minValue={0}
          maxValue={10}
          value={reportData.current_evaluation?.gauge_chart.execution_effort}
          prevResultValue={
            reportData.prev_evaluation?.gauge_chart.execution_effort
          }
        />
        <GaugeGraph
          title="Sensação de Calor"
          minValue={0}
          maxValue={10}
          value={reportData.current_evaluation?.gauge_chart.warm_feeling}
          prevResultValue={reportData.prev_evaluation?.gauge_chart.warm_feeling}
        />
        <GaugeGraph
          title="Média de Cansaço"
          minValue={0}
          maxValue={10}
          value={reportData.current_evaluation?.gauge_chart.fatigue_feeling}
          prevResultValue={
            reportData.prev_evaluation?.gauge_chart.fatigue_feeling
          }
        />
        <GaugeGraph
          title="Uso de Medicamentos"
          minValue={0}
          maxValue={10}
          value={
            reportData.current_evaluation?.gauge_chart.use_of_pain_medicine
          }
          prevResultValue={
            reportData.prev_evaluation?.gauge_chart.use_of_pain_medicine
          }
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

export default AutoEvaluationContent;
