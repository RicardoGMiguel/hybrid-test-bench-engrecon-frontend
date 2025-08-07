import React, { useEffect, useMemo, useState } from 'react';
import { useProject } from '@modules/projects/hooks/projects/index';
import { useMonitoringEvaluation } from '@modules/projects/hooks/monitoringEvaluations/index';
import { IShowProject } from '@modules/projects/interfaces/IProject';
import themeDefaults from '@style/themeDefaults';
import StepTitle from '../../CommonComponents/StepTitle';
import WeekMonitoringList from './WeekMonitoringList';
import StatusGraph from '../../CommonComponents/StatusGraph';
import ValueCard from './ValueCard';
import {
  Container,
  Header,
  Content,
  EmployeeListContainer,
  GraphAndValuesContainer,
  ValuesContainer,
  GraphContainer,
} from './styles';
import { WeekMonitoringEnum } from '../../types/WeekMonitoringEnum';
import { EquipmentBeingUsedEnum } from '../../types/EquipmentBeingUsedEnum';

interface WeekMonitoringStepProps {
  projectId: string;
  week: WeekMonitoringEnum;
  readOnly: boolean;
}

const WeekMonitoringStep: React.FC<WeekMonitoringStepProps> = ({
  projectId,
  week,
  readOnly,
}) => {
  const { ShowProject } = useProject();
  const { ListMonitoringEvaluations } = useMonitoringEvaluation();

  const { data: projectData, isFetching } = ShowProject(projectId);
  const { data: monitoringEvaluationsData } = ListMonitoringEvaluations();

  const [project, setProject] = useState<IShowProject>({} as IShowProject);

  const [participants, setParticipants] = useState(0);

  const [deliveredEvaluations, setDeliveredEvaluations] = useState(0);
  const [deliveryPercentage, setDeliveryPercentage] = useState(0);

  const [observations, setObservations] = useState(0);
  const [attentions, setAttentions] = useState(0);

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
      setParticipants(projectData.test_employees.length);

      if (monitoringEvaluationsData) {
        let accDeliveredEvaluations = 0;
        let accObservations = 0;
        let accAttentions = 0;

        projectData.test_employees.forEach((testEmployee) => {
          const evaluations = monitoringEvaluationsData.filter(
            (evaluation) =>
              evaluation.project_employee_id === testEmployee.id &&
              evaluation.week === week
          );

          accDeliveredEvaluations += evaluations.length;

          accObservations += evaluations.filter(
            (evaluation) =>
              evaluation.equipment_being_used ===
              EquipmentBeingUsedEnum.WITH_PAIN
          ).length;

          accAttentions += evaluations.filter(
            (evaluation) =>
              evaluation.equipment_being_used ===
                EquipmentBeingUsedEnum.TEST_INTERRUPTED ||
              evaluation.equipment_being_used === EquipmentBeingUsedEnum.NO
          ).length;
        });

        setDeliveredEvaluations(accDeliveredEvaluations);
        setObservations(accObservations);
        setAttentions(accAttentions);
      }
    }
  }, [monitoringEvaluationsData, projectData, week]);

  const title = useMemo(() => {
    switch (week) {
      case WeekMonitoringEnum.FIRST:
        return '1ª SEMANA';
      case WeekMonitoringEnum.SECOND:
        return '2ª SEMANA';
      case WeekMonitoringEnum.THIRD:
        return '3ª SEMANA';
      case WeekMonitoringEnum.FOURTH:
        return '4ª SEMANA';
      default:
        return '';
    }
  }, [week]);

  const totalOfEvaluations = useMemo(() => {
    switch (week) {
      case WeekMonitoringEnum.FIRST:
        return participants * 6;
      case WeekMonitoringEnum.SECOND:
        return participants * 4;
      case WeekMonitoringEnum.THIRD:
        return participants * 3;
      case WeekMonitoringEnum.FOURTH:
        return participants;
      default:
        return 0;
    }
  }, [participants, week]);

  useEffect(() => {
    const percentage = (
      (deliveredEvaluations / totalOfEvaluations) *
      100
    ).toFixed(0);
    setDeliveryPercentage(Number(percentage));
  }, [deliveredEvaluations, totalOfEvaluations]);

  return (
    <Container>
      <Header>
        <StepTitle value={`USO E MONITORAMENTO - ${title}`} />
      </Header>
      <Content>
        <EmployeeListContainer>
          <WeekMonitoringList
            title="Protocolo de Implementação"
            isLoading={isFetching}
            project={project}
            week={week}
            readOnly={readOnly}
          />
        </EmployeeListContainer>
        <GraphAndValuesContainer>
          <ValuesContainer>
            <ValueCard value={participants} label="participantes" />
            <ValueCard
              value={observations}
              label="observações"
              color={themeDefaults.colors.yellowButtonColor}
            />
            <ValueCard
              value={attentions}
              label="atenção"
              color={themeDefaults.colors.redButtonColor}
            />
          </ValuesContainer>
          <GraphContainer>
            <StatusGraph
              title="Status de Entrega"
              label1="Entregue"
              label2="Pendente"
              value1={deliveryPercentage}
              value2={100 - deliveryPercentage}
              legendDirection="row"
              labelFontSize={20}
            />
          </GraphContainer>
        </GraphAndValuesContainer>
      </Content>
    </Container>
  );
};

export default WeekMonitoringStep;
