import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { IconType } from 'react-icons';
import { useTheme } from 'styled-components';

import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';

import { useDebounce } from '@hooks/debounce';

import {
  Container,
  Content,
  InputValue,
  Label,
  ListIcon,
  Option,
  OptionLabel,
  OptionsContainer,
  OptionsList,
} from './styles';

export type OptionItem = {
  label: string;
  value: string | boolean;
};

interface ISelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: Array<OptionItem>;
  optionalCallback?: () => void;
  optionsSelected?: Array<OptionItem | undefined>;
  placeholder?: string;
  icon?: IconType;
  disabled?: boolean;
  direction?: 'up' | 'down';
  selected?: (value: string | boolean) => void;
  color?: 'light' | 'dark';
  labelSize?: number;
  width?: number;
  height?: number;
}

const SensorFormSelect: React.FC<ISelectProps> = ({
  name,
  control,
  label,
  options,
  optionalCallback,
  optionsSelected,
  placeholder,
  icon: Icon,
  disabled,
  direction = 'down',
  selected,
  color,
  labelSize,
  width,
  height,
}) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });
  const debouncedIsOpen = useDebounce(isOpen, 100);

  const {
    field: { value: currentOption, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const DropdownIcon = useMemo(
    () => (isOpen ? BsCaretUpFill : BsCaretDownFill),
    [isOpen]
  );

  useEffect(() => {
    if (isFocused) selectRef.current?.focus();
  }, [isFocused]);

  useEffect(() => {
    if (optionsSelected && !currentOption) {
      optionsSelected.forEach((v) => {
        if (!v) return;

        onChange(v);

        if (selected) selected(v.value);
      });
    }

    if (isFocused) selectRef.current?.focus();

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [
    isFocused,
    dropdownRef,
    onClose,
    onChange,
    optionsSelected,
    selected,
    currentOption,
  ]);

  return (
    <Container
      width={width}
      height={height}
      onClick={() => {
        if (!disabled) onToggle();
      }}
    >
      {label && <Label labelSize={labelSize}>{label}</Label>}

      <Content
        isError={!!error}
        disabled={disabled}
        isFocused={isFocused}
        color={color}
        ref={dropdownRef}
      >
        {Icon && (
          <Icon
            color={theme.colors.secondary}
            style={{ padding: 4, marginRight: 5, marginLeft: '1rem' }}
          />
        )}

        <InputValue
          value={(currentOption as OptionItem)?.label ?? ''}
          disabled={disabled}
          placeholder={placeholder ?? 'Selecionar...'}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          readOnly
        />

        <ListIcon as={DropdownIcon} />
      </Content>

      <OptionsContainer
        isActive={isOpen || debouncedIsOpen}
        starterAnimation={isOpen}
        direction={direction}
        color={color}
      >
        <OptionsList color={color}>
          {options.length === 0 && (
            <Option>
              <OptionLabel>Não há opções para seleção</OptionLabel>
            </Option>
          )}

          {options.map((option) => (
            <Option
              color={color}
              key={`${option.label}-${option.value}`}
              isSelected={currentOption?.value === option.value}
              onClick={() => {
                onChange(option);

                if (optionalCallback) {
                  optionalCallback();
                }

                if (selected) selected(option.value);
                onClose();
              }}
            >
              <OptionLabel isSelected={currentOption?.value === option.value}>
                {option.label}
              </OptionLabel>
            </Option>
          ))}
        </OptionsList>
      </OptionsContainer>
    </Container>
  );
};

export default SensorFormSelect;
