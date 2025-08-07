/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FieldError,
  UseFormRegister,
  Control,
  useController,
} from 'react-hook-form';
import { useTheme } from 'styled-components';
import { FiCalendar } from 'react-icons/fi';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { Content, Label, Container, ListIcon } from './styles';

type FieldState = {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError;
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  state: FieldState;
  onBlurEvent?: () => void;
  control: Control<any>;
  minDate?: Date;
  maxDate?: Date;
  defaultDateValue?: Date;
}

// Receives a name identifier and the registration function
const FormDatePicker: React.FC<InputProps> = ({
  label,
  name,
  disabled,
  register,
  type,
  onBlurEvent,
  control,
  minDate,
  maxDate,
  defaultDateValue,
  ...rest
}) => {
  const theme = useTheme();

  registerLocale('ptBR', ptBR);
  setDefaultLocale('ptBR');

  const [isOpen, setIsOpen] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { ref, ...registerRest } = register(name);

  useEffect(() => {
    if (isFocused) inputRef.current?.focus();
  }, [isFocused]);

  const {
    field: { value: currentValue, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultDateValue && new Date(defaultDateValue),
  });

  const DropdownIcon = useMemo(
    () => (isOpen ? BsCaretUpFill : BsCaretDownFill),
    [isOpen]
  );

  return (
    <Container>
      <Label>{label}</Label>

      <DatePicker
        selected={currentValue}
        minDate={minDate}
        maxDate={maxDate}
        onInputClick={() => !disabled && setIsOpen(true)}
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        scrollableMonthYearDropdown
        yearDropdownItemNumber={100}
        onClickOutside={() => setIsOpen(false)}
        onChange={(date) => {
          onChange(date);
        }}
        onCalendarClose={() => setIsOpen(false)}
        locale={ptBR}
        disabled={disabled}
        customInput={
          <Content
            isFocused={isFocused}
            isError={!!error}
            disabled={disabled}
            onClick={() => !disabled && setIsFocused(true)}
          >
            <FiCalendar
              size={32}
              color={theme.colors.exyGray}
              style={{ padding: 5, marginRight: 5 }}
            />

            <input
              {...rest}
              {...registerRest}
              readOnly
              value={currentValue ? format(currentValue, 'dd/MM/yyyy') : ''}
              disabled={disabled}
              ref={(curr: HTMLInputElement | null) => {
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
            <ListIcon as={DropdownIcon} />
          </Content>
        }
      />
    </Container>
  );
};

export default FormDatePicker;
