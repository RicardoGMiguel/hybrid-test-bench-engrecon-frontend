import React from 'react';
import { EvaluationTypeEnum } from '../../types/EvaluationTypeEnum';
import { Container, Label } from './styles';

interface TitleProps {
  selectedEvaluationType: EvaluationTypeEnum;
  changeEvaluationType: (type: EvaluationTypeEnum) => void;
}

const EvaluationSelect: React.FC<TitleProps> = ({
  selectedEvaluationType,
  changeEvaluationType,
}) => (
  <Container>
    <Label
      selected={selectedEvaluationType === EvaluationTypeEnum.AUTO_EVALUATION}
      onClick={() => changeEvaluationType(EvaluationTypeEnum.AUTO_EVALUATION)}
    >
      AUTOAVALIAÇÃO
    </Label>
    <Label
      selected={
        selectedEvaluationType === EvaluationTypeEnum.KINESIS_EVALUATION
      }
      onClick={() =>
        changeEvaluationType(EvaluationTypeEnum.KINESIS_EVALUATION)
      }
    >
      AVALIAÇÃO CINÉSIO-FUNCIONAL
    </Label>
    <Label
      selected={selectedEvaluationType === EvaluationTypeEnum.SENSORS}
      onClick={() => changeEvaluationType(EvaluationTypeEnum.SENSORS)}
    >
      SENSORES
    </Label>
  </Container>
);

export default EvaluationSelect;
