import React, { useState, useRef, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useTheme } from 'styled-components';

import { Control, Controller } from 'react-hook-form';
import { Container } from './styles';

interface ISelectorProps {
  name: string;
  placeholder: string;
  options: string[];
  control: Control<any>;
  Icon?: IconType;
  disabled?: boolean;
}

// Complex or custom components can be managed with the 'Controller' component
// Receives a name identifier and control props from the form hook
// Values can be displayed and updated using parameters from 'render' function
// Errors can be accessed directly from the 'formState' param
const Selector: React.FC<ISelectorProps> = ({
  name,
  placeholder,
  options,
  control,
  disabled,
  Icon,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (isFocused) selectRef.current?.focus();
  }, [isFocused]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Container isError={!!error} disabled={disabled} isFocused={isFocused}>
          {Icon && (
            <Icon
              size={30}
              color={theme.colors.secondary}
              style={{ padding: 4, marginRight: 5, marginLeft: '1rem' }}
            />
          )}
          <Select
            w="full"
            h="full"
            disabled={disabled}
            cursor="pointer"
            ref={(curr) => {
              ref(curr);
              selectRef.current = curr;
            }}
            variant="unstyled"
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Container>
      )}
    />
  );
};

export default Selector;
