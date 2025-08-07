import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { TfiViewGrid, TfiViewList } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import SearchInput from '@components/SearchInput';
import { useAuth } from '@modules/auth/hooks/auth/index';
import { useProjectEmployee } from '@modules/projects/hooks/projectEmployees/index';
import { useProject } from '@modules/projects/hooks/projects/index';
import { IProject } from '@modules/projects/interfaces/IProject';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { ProjectFilterEnum } from '@modules/projects/types/ProjectFilterEnum';
import { CreateProjectEmployeeFormData } from '../CreateProjectEmployees/createProjectEmployeeForm.zod';
import { CreateProjectFormData } from '../CreateProjects/createProjectForm.zod';
import { EditProjectEmployeeFormData } from '../EditProjectEmployees/editProjectEmployeeForm.zod';
import ProjectGrid from './ProjectGrid';
import ProjectList from './ProjectList';
import {
  Container,
  Content,
  Header,
  RightHeaderContainer,
  IconButton,
  RadioButtonContainer,
  RadioButton,
  RadioButtonLabel,
} from './styles';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Exy | Projetos';
  }, []);

  const {
    ListProjects,
    setTempCreateProjectData,
    showProjectList,
    setShowProjectList,
  } = useProject();
  const { setTempCreateProjectEmployees, setTempEditProjectEmployee } =
    useProjectEmployee();

  const [selectedFilter, setSelectedFilter] = useState<ProjectFilterEnum>(
    ProjectFilterEnum.ALL
  );

  const { data, isFetching } = ListProjects();

  const [projects, setProjects] = useState<IProject[]>([]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    setTempCreateProjectData({} as CreateProjectFormData);
    setTempCreateProjectEmployees({} as CreateProjectEmployeeFormData);
    setTempEditProjectEmployee({} as EditProjectEmployeeFormData);
  }, [
    setTempCreateProjectData,
    setTempCreateProjectEmployees,
    setTempEditProjectEmployee,
  ]);

  useEffect(() => {
    if (data) {
      const lowerCaseFilter = filter.toLowerCase();
      const filteredItemsByText = data.filter(
        (item) =>
          item.name.toLocaleLowerCase().includes(lowerCaseFilter) ||
          item.customer.name.toLocaleLowerCase().includes(lowerCaseFilter)
      );

      const filteredItems = filteredItemsByText.filter((item) => {
        if (selectedFilter === ProjectFilterEnum.AVAILABLE) {
          return !item.deleted_at;
        }
        if (selectedFilter === ProjectFilterEnum.REMOVED) {
          return !!item.deleted_at;
        }
        return true;
      });

      setProjects(filteredItems);
    }
  }, [data, filter, selectedFilter]);

  return (
    <Container>
      <Header>
        <SearchInput
          placeholder="Buscar..."
          value={filter}
          onChange={(value) => setFilter(value.currentTarget.value)}
        />
        <RightHeaderContainer>
          {user.role === UserRolesEnum.GLOBAL_ADMIN && (
            <>
              <RadioButtonContainer>
                <RadioButton
                  selected={selectedFilter === ProjectFilterEnum.ALL}
                  onClick={() => setSelectedFilter(ProjectFilterEnum.ALL)}
                >
                  <div />
                </RadioButton>
                <RadioButtonLabel>Todos</RadioButtonLabel>
              </RadioButtonContainer>
              <RadioButtonContainer>
                <RadioButton
                  selected={selectedFilter === ProjectFilterEnum.AVAILABLE}
                  onClick={() => setSelectedFilter(ProjectFilterEnum.AVAILABLE)}
                >
                  <div />
                </RadioButton>
                <RadioButtonLabel>Disponíveis</RadioButtonLabel>
              </RadioButtonContainer>
              <RadioButtonContainer>
                <RadioButton
                  selected={selectedFilter === ProjectFilterEnum.REMOVED}
                  onClick={() => setSelectedFilter(ProjectFilterEnum.REMOVED)}
                >
                  <div />
                </RadioButton>
                <RadioButtonLabel>Excluídos</RadioButtonLabel>
              </RadioButtonContainer>
            </>
          )}
          <IconButton onClick={() => setShowProjectList(!showProjectList)}>
            {showProjectList ? <TfiViewGrid /> : <TfiViewList />}
          </IconButton>
          {user.role !== UserRolesEnum.VIEWER && (
            <Button
              onClick={() => navigate(PrivatePathsEnum.CREATE_PROJECTS)}
              Icon={FiPlusCircle}
              label="Criar Novo Projeto"
              borderRadius={30}
            />
          )}
        </RightHeaderContainer>
      </Header>

      <Content>
        {showProjectList ? (
          <ProjectList projects={projects} isFetching={isFetching} />
        ) : (
          <ProjectGrid projects={projects} isFetching={isFetching} />
        )}
      </Content>
    </Container>
  );
};

export default Projects;
