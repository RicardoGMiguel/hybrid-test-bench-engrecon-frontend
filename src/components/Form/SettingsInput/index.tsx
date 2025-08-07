/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons';

import { Content, Label, Container, InputComponent } from './styles';

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
  isPassword?: boolean;
  state: FieldState;
  onBlurEvent?: () => void;
}

// Receives a name identifier and the registration function
const SettingsInput: React.FC<InputProps> = ({
  label,
  name,
  mask,
  disabled,
  register,
  errors,
  onBlurEvent,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
          type="number"
        />
      </Content>
    </Container>
  );
};

export default SettingsInput;
