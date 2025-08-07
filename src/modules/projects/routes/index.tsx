import { Route, Navigate } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import EnsureIsNotFirstLoginRoute from '@routes/privateRoutes/EnsureIsNotFirstLoginRoute';
import ProjectsLayout from '../layout';
import Projects from '../pages/Projects';
import CreateProjects from '../pages/CreateProjects';
import EditProject from '../pages/EditProject';
import CreateProjectEmployees from '../pages/CreateProjectEmployees';
import EditProjectEmployees from '../pages/EditProjectEmployees';
import ProjectDetails from '../pages/ProjectDetails';

const ProjectsRoutes = (
  <Route element={<ProjectsLayout />}>
    <Route
      path={PrivatePathsEnum.HOME}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <Navigate to={PrivatePathsEnum.PROJECTS} />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.PROJECTS}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <Projects />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.CREATE_PROJECTS}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <CreateProjects />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.UPDATE_PROJECT}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <EditProject />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.CREATE_PROJECT_EMPLOYEES}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <CreateProjectEmployees />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.UPDATE_PROJECT_EMPLOYEES}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <EditProjectEmployees />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.PROJECT_DETAILS}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <ProjectDetails />
        </EnsureIsNotFirstLoginRoute>
      }
    />
  </Route>
);

export default ProjectsRoutes;
