import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import EmptyListMessage from '@components/EmptyListMessage';
import LoadingSkeleton from '@components/LoadingSkeleton';
import { useProject } from '@modules/projects/hooks/projects/index';
import { IProject } from '@modules/projects/interfaces/IProject';
import { TranslateProjectStatusToPT } from '@modules/projects/utils/translateProjectStatusToPT';
import { ProjectsHeaderLabels } from '@modules/projects/constants/ProjectsHeaderLabels';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import ListHeader from '@components/List/ListHeader';
import ListItem from '@components/List/ListItem';
import { format } from 'date-fns';
import { IList } from '@components/List/interfaces/IList';
import { Container, Content } from './styles';

interface ProjectListProps {
  projects: IProject[];
  isFetching: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, isFetching }) => {
  const navigate = useNavigate();

  const { setCurrentStep } = useProject();

  const ListToRender = useMemo(() => {
    if (projects.length) {
      return projects.map((project) => {
        const info: IList[] = [
          {
            label: project.name,
          },
          {
            label: project.customer.name,
          },
          {
            label: project.customer_admin_user.name,
          },
          {
            label: String(project.project_employees.length),
          },
          {
            label: format(new Date(project.expected_end), 'dd/MM/yyyy'),
          },
          {
            label: TranslateProjectStatusToPT(project.status),
          },
        ];
        return (
          <ListItem
            deleted={!!project.deleted_at}
            actionsGapWidth={80}
            key={project.id}
            list={info}
            EditIcon={FiSettings}
            editItem={() => {
              navigate(PrivatePathsEnum.UPDATE_PROJECT, {
                state: {
                  projectId: project.id,
                },
              });
            }}
            accessItem={() => {
              setCurrentStep(1);
              navigate(PrivatePathsEnum.PROJECT_DETAILS, {
                state: {
                  project,
                },
              });
            }}
          />
        );
      });
    }

    return <EmptyListMessage message="Nenhum projeto encontrado" />;
  }, [projects, navigate, setCurrentStep]);

  return (
    <Container>
      <ListHeader headerList={ProjectsHeaderLabels} actionsGapWidth={80} />
      <Content>{isFetching ? <LoadingSkeleton /> : ListToRender}</Content>
    </Container>
  );
};

export default ProjectList;
