import React, { useEffect, useState } from 'react';
import { useReports } from '@modules/projects/hooks/reports/index';
import { IAutoEvaluationReport } from '@modules/projects/interfaces/IAutoEvaluationReport';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import GaugeGraph from '../../../CommonComponents/GaugeGraph';
import PainMap from '../../../CommonComponents/PainMap';
import { Container, GaugesContainer } from './styles';

interface AutoEvaluationContentProps {
  projectId: string;
}

const AutoEvaluationContent: React.FC<AutoEvaluationContentProps> = ({
  projectId,
}) => {
  const { ListAutoEvaluationsReport } = useReports();

  const { data: autoEvaluationReportData } = ListAutoEvaluationsReport(
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

  return (
    <Container>
      <GaugesContainer>
        <GaugeGraph
          title="Média de Esforço"
          minValue={0}
          maxValue={10}
          value={reportData.current_evaluation?.gauge_chart.execution_effort}
        />
        <GaugeGraph
          title="Sensação de Calor"
          minValue={0}
          maxValue={10}
          value={reportData.current_evaluation?.gauge_chart.warm_feeling}
        />
        <GaugeGraph
          title="Média de Cansaço"
          minValue={0}
          maxValue={10}
          value={reportData.current_evaluation?.gauge_chart.fatigue_feeling}
        />
        <GaugeGraph
          title="Uso de Medicamentos"
          minValue={0}
          maxValue={10}
          value={
            reportData.current_evaluation?.gauge_chart.use_of_pain_medicine
          }
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

export default AutoEvaluationContent;
