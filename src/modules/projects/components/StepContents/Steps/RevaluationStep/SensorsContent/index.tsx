import React, { useEffect, useState } from 'react';

import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { IListSensors, useSensor } from '@modules/projects/hooks/sensors/index';
import { SensorTypeEnum } from '@modules/projects/types/SensorTypeEnum';
import SensorsList from '../../../CommonComponents/SensorsList';
import { Container, ContentItem } from './styles';

interface SensorsContentProps {
  projectId: string;
  evaluationStage: EvaluationStageEnum;
  readOnly: boolean;
}

const SensorsContent: React.FC<SensorsContentProps> = ({
  projectId,
  evaluationStage,
  readOnly,
}) => {
  const [sensors, setSensors] = useState<IListSensors>({} as IListSensors);

  const { ListSensors } = useSensor();

  const { data: sensorsData, isFetching } = ListSensors(
    projectId,
    evaluationStage
  );

  useEffect(() => {
    if (sensorsData) {
      setSensors(sensorsData);
    }
  }, [sensorsData]);

  return (
    <Container>
      <ContentItem>
        <SensorsList
          title="Sensores EXY"
          isLoading={isFetching}
          sensors={sensors.exy}
          evaluationStage={evaluationStage}
          sensorType={SensorTypeEnum.EXY}
          projectId={projectId}
          readOnly={readOnly}
        />
      </ContentItem>
      <ContentItem>
        <SensorsList
          title="Outros Sensores"
          isLoading={isFetching}
          sensors={sensors.other}
          evaluationStage={evaluationStage}
          sensorType={SensorTypeEnum.OTHERS}
          projectId={projectId}
          readOnly={readOnly}
        />
      </ContentItem>
    </Container>
  );
};

export default SensorsContent;
