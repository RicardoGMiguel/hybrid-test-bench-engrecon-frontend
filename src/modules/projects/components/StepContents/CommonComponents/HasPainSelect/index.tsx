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

interface HasPainSelectProps {
  name: string;
  control: Control<any>;
  label: string;
  defaultValue?: boolean;
  disabled?: boolean;
}

const HasPainSelect: React.FC<HasPainSelectProps> = ({
  name,
  control,
  label,
  defaultValue,
  disabled,
}) => {
  const options = ['Sim', 'Não'];
  const {
    field: { value: currentOption, onChange },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Container>
      <Label>{label}</Label>
      <OptionsContainer>
        {options.map((value) => (
          <OptionItem key={value}>
            <OptionButton
              disabled={disabled}
              onClick={() => {
                if (!disabled) {
                  onChange(value === 'Sim');
                }
              }}
            >
              {currentOption === (value === 'Sim') ? (
                <SelectedButton />
              ) : (
                <UnSelectedButton disabled={disabled} />
              )}
            </OptionButton>
            <OptionLabel>{value}</OptionLabel>
          </OptionItem>
        ))}
      </OptionsContainer>
    </Container>
  );
};

export default HasPainSelect;
