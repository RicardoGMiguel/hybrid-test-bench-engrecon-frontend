import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import EvaluationSelect from '../../CommonComponents/EvaluationSelect';
import AutoEvaluationContent from './AutoEvaluationContent';
import KinesisEvaluationContent from './KinesisEvaluationContent';
import SensorsContent from './SensorsContent';
import SensorFormSelect, {
  OptionItem,
} from '../../CommonComponents/SensorFormSelect';
import {
  Container,
  Content,
  Header,
  EvaluationSelectsContainer,
} from './styles';
import { EvaluationTypeEnum } from '../../types/EvaluationTypeEnum';
import {
  SelectEvaluationFormData,
  selectEvaluationFormResolver,
} from './selectEvaluationForm.zod';

interface FinalReportStepProps {
  projectId: string;
}

const FinalReportStep: React.FC<FinalReportStepProps> = ({ projectId }) => {
  const [selectedEvaluationType, setSelectedEvaluationType] =
    useState<EvaluationTypeEnum>(EvaluationTypeEnum.AUTO_EVALUATION);

  const [prevEvaluationOptions, setPrevEvaluationOptions] = useState<
    OptionItem[]
  >([]);
  const [currentEvaluationOptions, setCurrentEvaluationOptions] = useState<
    OptionItem[]
  >([]);

  const { control, watch } = useForm<SelectEvaluationFormData>({
    resolver: selectEvaluationFormResolver,
    mode: 'all',
  });

  const prevEvaluationWatch = watch('prevEvaluation');
  const currentEvaluationWatch = watch('currentEvaluation');

  const contentToRender = useMemo(() => {
    if (selectedEvaluationType === EvaluationTypeEnum.AUTO_EVALUATION) {
      return (
        <AutoEvaluationContent
          projectId={projectId}
          currentEvaluationType={currentEvaluationWatch?.value}
          prevEvaluationType={prevEvaluationWatch?.value}
        />
      );
    }
    if (selectedEvaluationType === EvaluationTypeEnum.KINESIS_EVALUATION) {
      return (
        <KinesisEvaluationContent
          projectId={projectId}
          currentEvaluationType={currentEvaluationWatch?.value}
          prevEvaluationType={prevEvaluationWatch?.value}
        />
      );
    }
    if (selectedEvaluationType === EvaluationTypeEnum.SENSORS) {
      return (
        <SensorsContent
          projectId={projectId}
          currentEvaluationType={currentEvaluationWatch?.value}
          prevEvaluationType={prevEvaluationWatch?.value}
        />
      );
    }
    return undefined;
  }, [
    currentEvaluationWatch?.value,
    prevEvaluationWatch?.value,
    projectId,
    selectedEvaluationType,
  ]);

  useEffect(() => {
    let newPrevEvaluationOptions: OptionItem[] = [];
    let newCurrentEvaluationOptions: OptionItem[] = [];

    switch (prevEvaluationWatch?.value) {
      case EvaluationStageEnum.FIRST_REVALUATION:
        newCurrentEvaluationOptions = [
          {
            label: '2ª Reavaliação',
            value: EvaluationStageEnum.SECOND_REVALUATION,
          },
          {
            label: '3ª Reavaliação',
            value: EvaluationStageEnum.THIRD_REVALUATION,
          },
        ];
        break;
      case EvaluationStageEnum.SECOND_REVALUATION:
        newCurrentEvaluationOptions = [
          {
            label: '3ª Reavaliação',
            value: EvaluationStageEnum.THIRD_REVALUATION,
          },
        ];
        break;
      default:
        newCurrentEvaluationOptions = [
          {
            label: '1ª Reavaliação',
            value: EvaluationStageEnum.FIRST_REVALUATION,
          },
          {
            label: '2ª Reavaliação',
            value: EvaluationStageEnum.SECOND_REVALUATION,
          },
          {
            label: '3ª Reavaliação',
            value: EvaluationStageEnum.THIRD_REVALUATION,
          },
        ];
    }

    switch (currentEvaluationWatch?.value) {
      case EvaluationStageEnum.SECOND_REVALUATION:
        newPrevEvaluationOptions = [
          {
            label: 'Avaliação inicial',
            value: EvaluationStageEnum.INITIAL,
          },
          {
            label: '1ª Reavaliação',
            value: EvaluationStageEnum.FIRST_REVALUATION,
          },
        ];
        break;
      case EvaluationStageEnum.FIRST_REVALUATION:
        newPrevEvaluationOptions = [
          {
            label: 'Avaliação inicial',
            value: EvaluationStageEnum.INITIAL,
          },
        ];
        break;
      default:
        newPrevEvaluationOptions = [
          {
            label: 'Avaliação inicial',
            value: EvaluationStageEnum.INITIAL,
          },
          {
            label: '1ª Reavaliação',
            value: EvaluationStageEnum.FIRST_REVALUATION,
          },
          {
            label: '2ª Reavaliação',
            value: EvaluationStageEnum.SECOND_REVALUATION,
          },
        ];
    }

    setPrevEvaluationOptions(newPrevEvaluationOptions);
    setCurrentEvaluationOptions(newCurrentEvaluationOptions);
  }, [currentEvaluationWatch?.value, prevEvaluationWatch?.value]);

  return (
    <Container>
      <Header>
        <EvaluationSelect
          selectedEvaluationType={selectedEvaluationType}
          changeEvaluationType={(value) => setSelectedEvaluationType(value)}
        />
        <EvaluationSelectsContainer>
          <SensorFormSelect
            control={control}
            name="prevEvaluation"
            options={prevEvaluationOptions}
            height={45}
          />
          <SensorFormSelect
            control={control}
            name="currentEvaluation"
            options={currentEvaluationOptions}
            height={45}
          />
        </EvaluationSelectsContainer>
      </Header>
      <Content>{contentToRender}</Content>
    </Container>
  );
};

export default FinalReportStep;
