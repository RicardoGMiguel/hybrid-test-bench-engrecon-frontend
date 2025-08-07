import { steps } from '@modules/projects/constants/steps';
import { useProject } from '@modules/projects/hooks/projects/index';
import React from 'react';
import {
  Container,
  DetailsContainer,
  InfoContainer,
  LabelText,
  StepperButton,
  StepperButtonsContainer,
  StepperContainer,
  StepperIcon,
  StepperIconsContainer,
  StepperLabel,
  StepperSeparator,
  StepperTracksContainer,
  ValueText,
  WhiteTrack,
} from './styles';

interface ProjectDetailsStepperProps {
  name: string;
  customer: string;
  workstation: string;
  customerAdmin: string;
  selectedStep: number;
}

const ProjectDetailsStepper: React.FC<ProjectDetailsStepperProps> = ({
  name,
  customer,
  workstation,
  customerAdmin,
  selectedStep,
}) => {
  const { setCurrentStep } = useProject();
  return (
    <Container>
      <DetailsContainer>
        <InfoContainer>
          <LabelText>Nome do Projeto</LabelText>
          <ValueText>{name}</ValueText>
        </InfoContainer>
        <InfoContainer>
          <LabelText>Empresa</LabelText>
          <ValueText>{customer}</ValueText>
        </InfoContainer>
        <InfoContainer>
          <LabelText>Posto</LabelText>
          <ValueText>{workstation}</ValueText>
        </InfoContainer>
        <InfoContainer>
          <LabelText>Especialista Responsável</LabelText>
          <ValueText>{customerAdmin}</ValueText>
        </InfoContainer>
      </DetailsContainer>
      <StepperContainer>
        <StepperIconsContainer>
          <WhiteTrack />
          {steps.map((step, index) => (
            <StepperIcon
              key={step.label}
              active={index < selectedStep}
              isSmall={index >= 5 && index < 12}
            >
              <StepperLabel
                isSmall={index >= 5 && index < 12}
                onClick={() => setCurrentStep(index + 1)}
              >
                {step.label}
              </StepperLabel>
            </StepperIcon>
          ))}
        </StepperIconsContainer>
        <StepperButtonsContainer>
          {steps.map((step, index) => (
            <StepperButton
              key={step.label}
              isSmall={index >= 5 && index < 12}
              onClick={() => setCurrentStep(index + 1)}
            />
          ))}
        </StepperButtonsContainer>
        <StepperTracksContainer>
          {steps.map((step, index) => {
            if (index !== 0) {
              return (
                <StepperSeparator
                  key={step.label}
                  active={index < selectedStep}
                />
              );
            }
            return undefined;
          })}
        </StepperTracksContainer>
      </StepperContainer>
    </Container>
  );
};

export default ProjectDetailsStepper;
