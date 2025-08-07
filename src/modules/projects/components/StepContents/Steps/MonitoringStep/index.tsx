import React, { useEffect, useState } from 'react';
import { useProject } from '@modules/projects/hooks/projects/index';
import { IShowProject } from '@modules/projects/interfaces/IProject';
import StepTitle from '../../CommonComponents/StepTitle';
import EmployeesList from './EmployeesList';
import { Container, Header, Content, EmployeeListContainer } from './styles';

interface MonitoringStepProps {
  projectId: string;
}

const MonitoringStep: React.FC<MonitoringStepProps> = ({ projectId }) => {
  const { ShowProject } = useProject();

  const { data: projectData, isFetching } = ShowProject(projectId);

  const [project, setProject] = useState<IShowProject>({} as IShowProject);

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  return (
    <Container>
      <Header>
        <StepTitle value="USO E MONITORAMENTO" />
      </Header>
      <Content>
        <EmployeeListContainer>
          <EmployeesList
            title="Grupo de Teste"
            isLoading={isFetching}
            project={project}
          />
        </EmployeeListContainer>
      </Content>
    </Container>
  );
};

export default MonitoringStep;
