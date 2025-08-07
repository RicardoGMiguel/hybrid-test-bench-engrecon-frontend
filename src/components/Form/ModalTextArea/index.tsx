import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { Content, Label, Container, InputComponent } from './styles';

type FieldState = {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError;
};

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  isPassword?: boolean;
  state: FieldState;
  onBlurEvent?: () => void;
  height?: number;
}

const ModalTextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  disabled,
  register,
  errors,
  onBlurEvent,
  height,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

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
        height={height}
      >
        <InputComponent
          {...rest}
          {...registerRest}
          disabled={disabled}
          ref={(curr) => {
            ref(curr);
            inputRef.current = curr;
          }}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (onBlurEvent) onBlurEvent();
          }}
        />
      </Content>
    </Container>
  );
};

export default ModalTextArea;
