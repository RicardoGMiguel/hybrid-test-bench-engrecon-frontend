import { useDisclosure } from '@chakra-ui/react';
import Button from '@components/Button';
import Confirmation from '@components/Confirmation';
import { useAuth } from '@modules/auth/hooks/auth/index';
import ProjectDetailsStepper from '@modules/projects/components/ProjectDetailsStepper';
import CurrentEvaluationStep from '@modules/projects/components/StepContents/Steps/CurrentEvaluationStep';
import FinalReportStep from '@modules/projects/components/StepContents/Steps/FinalReport';
import InitialReportStep from '@modules/projects/components/StepContents/Steps/InitialReport';
import InitialStateStep from '@modules/projects/components/StepContents/Steps/InitialStateStep';
import MonitoringStep from '@modules/projects/components/StepContents/Steps/MonitoringStep';
import RevaluationStep from '@modules/projects/components/StepContents/Steps/RevaluationStep';
import TrainingStep from '@modules/projects/components/StepContents/Steps/TrainingStep';
import WeekMonitoringStep from '@modules/projects/components/StepContents/Steps/WeekMonitoringStep';
import { WeekMonitoringEnum } from '@modules/projects/components/StepContents/types/WeekMonitoringEnum';
import { steps } from '@modules/projects/constants/steps';
import { useProject } from '@modules/projects/hooks/projects/index';
import { IProject } from '@modules/projects/interfaces/IProject';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { ProjectStatusEnum } from '@modules/projects/types/ProjectStatusEnum';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import themeDefaults from '@style/themeDefaults';
import React, { useMemo } from 'react';
import { FiCheck } from 'react-icons/fi';
import { IoCaretBackSharp, IoCaretForwardSharp } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Content, FooterContainer, StepContent } from './styles';

interface IStateProps {
  state: {
    project: IProject;
  };
}

const ProjectDetails: React.FC = () => {
  const { user } = useAuth();

  const { state }: IStateProps = useLocation();

  const navigate = useNavigate();

  const { UpdateProjectStatus, currentStep, setCurrentStep } = useProject();

  const {
    isOpen: isOpenDoneProject,
    onOpen: onOpenDoneProject,
    onClose: onCloseDoneProject,
  } = useDisclosure();

  const readOnly = useMemo(
    () =>
      user.role === UserRolesEnum.VIEWER ||
      state.project.status === ProjectStatusEnum.DONE ||
      !!state.project.deleted_at,
    [state.project.deleted_at, state.project.status, user.role]
  );

  const ContentToRender = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <InitialStateStep
            key={currentStep}
            projectId={state.project.id}
            readOnly={readOnly}
          />
        );
      case 2:
        return (
          <CurrentEvaluationStep
            key={currentStep}
            projectId={state.project.id}
            readOnly={readOnly}
          />
        );
      case 3:
        return (
          <InitialReportStep key={currentStep} projectId={state.project.id} />
        );
      case 4:
        return (
          <TrainingStep
            key={currentStep}
            projectId={state.project.id}
            readOnly={readOnly}
          />
        );
      case 5:
        return (
          <MonitoringStep key={currentStep} projectId={state.project.id} />
        );
      case 6:
        return (
          <WeekMonitoringStep
            key={currentStep}
            projectId={state.project.id}
            week={WeekMonitoringEnum.FIRST}
            readOnly={readOnly}
          />
        );
      case 7:
        return (
          <WeekMonitoringStep
            key={currentStep}
            projectId={state.project.id}
            week={WeekMonitoringEnum.SECOND}
            readOnly={readOnly}
          />
        );
      case 8:
        return (
          <WeekMonitoringStep
            key={currentStep}
            projectId={state.project.id}
            week={WeekMonitoringEnum.THIRD}
            readOnly={readOnly}
          />
        );
      case 9:
        return (
          <WeekMonitoringStep
            key={currentStep}
            projectId={state.project.id}
            week={WeekMonitoringEnum.FOURTH}
            readOnly={readOnly}
          />
        );
      case 10:
        return (
          <RevaluationStep
            key={currentStep}
            projectId={state.project.id}
            evaluationStage={EvaluationStageEnum.FIRST_REVALUATION}
            readOnly={readOnly}
          />
        );
      case 11:
        return (
          <RevaluationStep
            key={currentStep}
            projectId={state.project.id}
            evaluationStage={EvaluationStageEnum.SECOND_REVALUATION}
            readOnly={readOnly}
          />
        );
      case 12:
        return (
          <RevaluationStep
            key={currentStep}
            projectId={state.project.id}
            evaluationStage={EvaluationStageEnum.THIRD_REVALUATION}
            readOnly={readOnly}
          />
        );
      case 13:
        return (
          <FinalReportStep key={currentStep} projectId={state.project.id} />
        );
      case 0:
      default:
        return undefined;
    }
  }, [readOnly, state.project.id, currentStep]);

  return (
    <>
      <Confirmation
        isOpen={isOpenDoneProject}
        title="Você tem certeza que deseja concluir este projeto?"
        confirmButtonLabel="CONCLUIR"
        ConfirmationIcon={FiCheck}
        onConfirm={() => {
          UpdateProjectStatus({
            projectId: state.project.id,
            status: ProjectStatusEnum.DONE,
          });
          onCloseDoneProject();
          navigate(PrivatePathsEnum.PROJECTS);
        }}
        onClose={onCloseDoneProject}
      />
      <Container>
        <Content>
          <ProjectDetailsStepper
            name={state.project.name}
            customer={state.project.customer.name}
            workstation={state.project.workstation}
            customerAdmin={state.project.customer_admin_user.name}
            selectedStep={currentStep}
          />
          <StepContent heightAuto={currentStep === 3 || currentStep === 13}>
            {ContentToRender}
          </StepContent>
          <FooterContainer isFirstStep={currentStep === 1}>
            {currentStep !== 1 && (
              <Button
                type="button"
                label="Etapa Anterior"
                Icon={IoCaretBackSharp}
                backgroundColor={themeDefaults.colors.exyGray}
                color={themeDefaults.colors.white}
                onClick={() => {
                  if (currentStep > 1) setCurrentStep(currentStep - 1);
                }}
              />
            )}
            {currentStep === steps.length ? (
              <Button
                type="button"
                label="Concluir Projeto"
                disabled={readOnly}
                onClick={onOpenDoneProject}
              />
            ) : (
              <Button
                type="button"
                label="Próxima Etapa"
                Icon={IoCaretForwardSharp}
                iconRight
                backgroundColor={themeDefaults.colors.exyGray}
                color={themeDefaults.colors.white}
                onClick={() => {
                  if (currentStep < steps.length)
                    setCurrentStep(currentStep + 1);
                }}
              />
            )}
          </FooterContainer>
        </Content>
      </Container>
    </>
  );
};

export default ProjectDetails;
