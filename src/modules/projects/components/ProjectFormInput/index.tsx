/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { IconType } from 'react-icons';

import { Content, Label, CheckIcon, Container, InputComponent } from './styles';

type FieldState = {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError;
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  mask?: string;
  Icon?: IconType;
  register: UseFormRegister<any>;
  errors?: FieldError;
  state: FieldState;
  onBlurEvent?: () => void;
}

// Receives a name identifier and the registration function
const ProjectFormInput: React.FC<InputProps> = ({
  label,
  name,
  mask,
  disabled,
  Icon,
  register,
  errors,
  type,
  state,
  onBlurEvent,
  ...rest
}) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isValid = useMemo(
    () => !state.invalid && !state.error && !!inputRef.current?.value,
    [state]
  );

  const { ref, ...registerRest } = register(name);

  useEffect(() => {
    if (isFocused) inputRef.current?.focus();
  }, [isFocused]);

  return (
    <Container>
      <Label>{label}</Label>
      <Content
        isFocused={isFocused}
        isError={!!errors}
        disabled={disabled}
        onClick={() => !disabled && setIsFocused(true)}
      >
        {Icon && (
          <Icon
            size={30}
            color={theme.colors.exyGray}
            style={{ padding: 5, marginRight: 5 }}
          />
        )}

        <InputComponent
          {...rest}
          {...registerRest}
          mask={mask || ''}
          disabled={disabled}
          inputRef={(curr: HTMLInputElement | null) => {
            ref(curr);
            inputRef.current = curr;
          }}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (onBlurEvent) onBlurEvent();
          }}
          type={type}
        />

        {isValid && <CheckIcon />}
      </Content>
    </Container>
  );
};

export default ProjectFormInput;
