import React, { useEffect, useMemo, useState } from 'react';
import { IShowProject } from '@modules/projects/interfaces/IProject';
import { useProject } from '@modules/projects/hooks/projects/index';
import StepTitle from '../../CommonComponents/StepTitle';
import GroupEmployeeList from '../../CommonComponents/GroupEmployeeList';
import AddFileButton from '../../CommonComponents/AddFileButton';
import { Container, Header, Content, ContentItem } from './styles';
import { FileToSendTypeEnum } from '../../types/FileToSendTypeEnum';

interface InitialStateStepProps {
  projectId: string;
  readOnly: boolean;
}

const InitialStateStep: React.FC<InitialStateStepProps> = ({
  projectId,
  readOnly,
}) => {
  const { ShowProject } = useProject();

  const { data: projectData, isFetching: isLoading } = ShowProject(projectId);

  const [project, setProject] = useState<IShowProject>({} as IShowProject);

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  const TestEmployees = useMemo(() => {
    const employeesItems = project.test_employees?.map((item) => ({
      id: item.id,
      name: item.employee.name,
    }));

    return employeesItems;
  }, [project.test_employees]);

  const ControlEmployees = useMemo(() => {
    const employeesItems = project.control_employees?.map((item) => ({
      id: item.id,
      name: item.employee.name,
    }));

    return employeesItems;
  }, [project.control_employees]);

  return (
    <Container>
      <Header>
        <StepTitle value="ESTADO INICIAL" />
      </Header>
      <Content>
        <ContentItem>
          <GroupEmployeeList
            title="Grupo de Teste"
            employeees={TestEmployees}
            isLoading={isLoading}
            showHideNameButton
            showAnswerButton={false}
            showEditButton={false}
          />
        </ContentItem>
        <ContentItem>
          <GroupEmployeeList
            title="Grupo de Controle"
            employeees={ControlEmployees}
            isLoading={isLoading}
            showHideNameButton
            showAnswerButton={false}
            showEditButton={false}
          />
        </ContentItem>
        <ContentItem>
          <AddFileButton
            label="Planilha ROI"
            fileType={FileToSendTypeEnum.ROI}
            project={project}
            readOnly={readOnly}
          />
          <AddFileButton
            label="Avaliação Ergonômica Preliminar"
            fileType={FileToSendTypeEnum.ERGONOMIC_AEP}
            project={project}
            readOnly={readOnly}
          />
          <AddFileButton
            label="Avaliação Ergonômica do Trabalho"
            fileType={FileToSendTypeEnum.ERGONOMIC_AET}
            project={project}
            readOnly={readOnly}
          />
          <AddFileButton
            label="Eletromiografia"
            fileType={FileToSendTypeEnum.ELECTROMYOGRAPHY}
            project={project}
            readOnly={readOnly}
          />
        </ContentItem>
      </Content>
    </Container>
  );
};

export default InitialStateStep;
