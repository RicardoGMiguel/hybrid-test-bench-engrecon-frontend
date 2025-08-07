import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyListMessage from '@components/EmptyListMessage';
import ProjectCard from '@modules/projects/components/ProjectCard';
import ProjectsLoadingSkeleton from '@modules/projects/components/ProjectsLoadingSkeleton';
import { useProject } from '@modules/projects/hooks/projects/index';
import { IProject } from '@modules/projects/interfaces/IProject';
import { TranslateProjectStatusToPT } from '@modules/projects/utils/translateProjectStatusToPT';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { Container, Content } from './styles';

interface ProjectGridProps {
  projects: IProject[];
  isFetching: boolean;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, isFetching }) => {
  const navigate = useNavigate();

  const { setCurrentStep } = useProject();

  const ListToRender = useMemo(() => {
    if (projects.length) {
      return projects.map((project) => (
        <ProjectCard
          deleted={!!project.deleted_at}
          key={project.id}
          name={project.name}
          customerName={project.customer.name}
          customerAdminName={project.customer_admin_user.name}
          participantsNumber={project.project_employees.length}
          expectedEnd={new Date(project.expected_end)}
          status={TranslateProjectStatusToPT(project.status)}
          onEditClick={() => {
            navigate(PrivatePathsEnum.UPDATE_PROJECT, {
              state: {
                projectId: project.id,
              },
            });
          }}
          onAccessClick={() => {
            setCurrentStep(1);
            navigate(PrivatePathsEnum.PROJECT_DETAILS, {
              state: {
                project,
              },
            });
          }}
        />
      ));
    }

    return <EmptyListMessage message="Nenhum projeto encontrado" />;
  }, [navigate, projects, setCurrentStep]);

  return (
    <Container>
      <Content>
        {isFetching ? <ProjectsLoadingSkeleton /> : ListToRender}
      </Content>
    </Container>
  );
};

export default ProjectGrid;
