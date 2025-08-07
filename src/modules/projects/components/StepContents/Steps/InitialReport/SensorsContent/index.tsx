import React, { useEffect, useState } from 'react';
import { useReports } from '@modules/projects/hooks/reports/index';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { ISensorsReport } from '@modules/projects/interfaces/ISensorsReport';
import SensorsGraph from '../../../CommonComponents/SensorsGraph';
import { Container } from './styles';

interface SensorsContentProps {
  projectId: string;
}

const SensorsContent: React.FC<SensorsContentProps> = ({ projectId }) => {
  const { ListSensorsReport } = useReports();

  const { data: sensorsReportData } = ListSensorsReport(
    projectId,
    EvaluationStageEnum.INITIAL
  );

  const [reportData, setReportData] = useState<ISensorsReport>(
    {} as ISensorsReport
  );

  useEffect(() => {
    if (sensorsReportData) {
      setReportData(sensorsReportData);
    }
  }, [sensorsReportData]);

  return (
    <Container>
      <SensorsGraph
        title="Inclinação da Coluna x Tempo - Grupo de Teste"
        values={{
          less_fifteen: reportData.current_evaluation?.test_sensor.less_fifteen,
          less_thirty: reportData.current_evaluation?.test_sensor.less_thirty,
          less_forty_five:
            reportData.current_evaluation?.test_sensor.less_forty_five,
          less_sixty: reportData.current_evaluation?.test_sensor.less_sixty,
          plus_sixty: reportData.current_evaluation?.test_sensor.plus_sixty,
        }}
      />
      <SensorsGraph
        title="Inclinação da Coluna x Tempo - Grupo de Controle"
        values={{
          less_fifteen:
            reportData.current_evaluation?.control_sensor.less_fifteen,
          less_thirty:
            reportData.current_evaluation?.control_sensor.less_thirty,
          less_forty_five:
            reportData.current_evaluation?.control_sensor.less_forty_five,
          less_sixty: reportData.current_evaluation?.control_sensor.less_sixty,
          plus_sixty: reportData.current_evaluation?.control_sensor.plus_sixty,
        }}
      />
    </Container>
  );
};

export default SensorsContent;
