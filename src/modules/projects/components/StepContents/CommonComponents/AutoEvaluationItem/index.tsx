import React from 'react';
import { Control, useController } from 'react-hook-form';
import {
  Container,
  Label,
  OptionsContainer,
  OptionItem,
  OptionLabel,
  OptionButton,
  SelectedButton,
  UnSelectedButton,
} from './styles';

interface AutoEvaluationItemProps {
  name: string;
  control: Control<any>;
  label: string;
  subLabel?: string;
  disabled?: boolean;
}

const AutoEvaluationItem: React.FC<AutoEvaluationItemProps> = ({
  name,
  control,
  label,
  subLabel,
  disabled,
}) => {
  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const {
    field: { value: currentOption, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <Container>
      <Label>{label}</Label>
      <Label>{subLabel}</Label>
      <OptionsContainer>
        {options.map((value) => (
          <OptionItem key={value}>
            <OptionLabel>{value}</OptionLabel>
            <OptionButton
              disabled={disabled}
              onClick={() => {
                if (!disabled) {
                  onChange(value);
                }
              }}
            >
              {currentOption === value ? (
                <SelectedButton />
              ) : (
                <UnSelectedButton disabled={disabled} />
              )}
            </OptionButton>
          </OptionItem>
        ))}
      </OptionsContainer>
    </Container>
  );
};

export default AutoEvaluationItem;
