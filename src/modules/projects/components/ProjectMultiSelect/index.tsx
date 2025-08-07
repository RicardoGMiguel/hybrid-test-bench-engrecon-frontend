import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Control, FieldError, useController } from 'react-hook-form';
import { IconType } from 'react-icons';
import { useTheme } from 'styled-components';
import { useDisclosure } from '@chakra-ui/react';

import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';

import { useDebounce } from '@hooks/debounce';

import {
  InputValue,
  Container,
  Content,
  OptionsContainer,
  OptionsList,
  Label,
  ListIcon,
  Option,
  OptionLabel,
  SelectedOptionsContainer,
  OptionTag,
  OptionTagLabel,
  OptionTagRemove,
} from './styles';

type OptionItem = {
  label: string;
  value: string | boolean;
};

type ControllerReturnType = {
  field: {
    value: OptionItem[];
    onChange: (newValue: OptionItem[]) => void;
  };
  fieldState: {
    error?: FieldError;
  };
};

interface IMultiSelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: Array<OptionItem>;
  placeholder?: string;
  optionsSelected?: OptionItem[];
  icon?: IconType;
  disabled?: boolean;
  direction?: 'up' | 'down';
  color?: 'light' | 'dark';
}

const ProjectMultiSelect: React.FC<IMultiSelectProps> = ({
  name,
  control,
  label,
  options,
  placeholder,
  optionsSelected,
  icon: Icon,
  disabled,
  direction = 'down',
  color,
}) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });
  const debouncedIsOpen = useDebounce(isOpen, 100);

  const {
    field: { value: currentOptions, onChange },
    fieldState: { error },
  }: ControllerReturnType = useController({ name, control });

  const availableOptions = useMemo(
    () =>
      options.filter(
        (option) =>
          !currentOptions?.find(
            (currentOption) => option.value === currentOption.value
          )
      ),
    [options, currentOptions]
  );

  useEffect(() => {
    if (optionsSelected && optionsSelected.length && !currentOptions) {
      const updatedOptions = [...optionsSelected];
      const sortedOptions = updatedOptions.sort((optionA, optionB) =>
        optionA.label < optionB.label ? -1 : 1
      );

      onChange(sortedOptions);
    }
  }, [currentOptions, onChange, options, optionsSelected]);

  const handleSelectOption = useCallback(
    (selectedOption: OptionItem) => {
      const storedOptions = currentOptions ?? [];
      const updatedOptions = [...storedOptions, selectedOption];
      const sortedOptions = updatedOptions.sort((optionA, optionB) =>
        optionA.label < optionB.label ? -1 : 1
      );

      onChange(sortedOptions);
    },
    [currentOptions, onChange]
  );

  const handleSelectAllOptions = useCallback(() => {
    const storedOptions = currentOptions ?? [];
    const updatedOptions = [...storedOptions, ...availableOptions];
    const sortedOptions = updatedOptions.sort((optionA, optionB) =>
      optionA.label < optionB.label ? -1 : 1
    );

    onChange(sortedOptions);
  }, [availableOptions, currentOptions, onChange]);

  const handleRemoveOption = useCallback(
    (selectedOption: OptionItem) => {
      const storedOptions = currentOptions;
      const updatedOptions = storedOptions.filter(
        (storedOption) => storedOption.label !== selectedOption.label
      );
      const sortedOptions = updatedOptions.sort((optionA, optionB) =>
        optionA.label < optionB.label ? -1 : 1
      );

      onChange(sortedOptions);
    },
    [currentOptions, onChange]
  );

  const handleClearOptions = useCallback(() => {
    onChange([]);
  }, [onChange]);

  const DropdownIcon = useMemo(
    () => (isOpen ? BsCaretUpFill : BsCaretDownFill),
    [isOpen]
  );

  useEffect(() => {
    if (isFocused) selectRef.current?.focus();
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) selectRef.current?.focus();

    const handleOutsideClick = (event: globalThis.MouseEvent) => {
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
  }, [isFocused, dropdownRef, onClose]);

  return (
    <Container className="multiSelectContainer">
      {label && <Label>{label}</Label>}

      <SelectedOptionsContainer
        hidden={!currentOptions || !currentOptions.length}
        className="optionsSelected"
      >
        {options.length !== currentOptions?.length &&
          currentOptions?.map((currentOption) => (
            <OptionTag key={currentOption.label}>
              <OptionTagLabel>{currentOption.label}</OptionTagLabel>
              <OptionTagRemove
                disabled={disabled}
                onClick={() => {
                  if (!disabled) handleRemoveOption(currentOption);
                }}
              />
            </OptionTag>
          ))}

        {options.length === currentOptions?.length && (
          <OptionTag>
            <OptionTagLabel>Todos</OptionTagLabel>
            <OptionTagRemove
              disabled={disabled}
              onClick={() => {
                if (!disabled) handleClearOptions();
              }}
            />
          </OptionTag>
        )}
      </SelectedOptionsContainer>

      <Content
        isError={!!error}
        disabled={disabled}
        isFocused={isFocused}
        onClick={() => {
          if (!disabled) onToggle();
        }}
        color={color}
        ref={dropdownRef}
        className="multiSelectInput"
      >
        {Icon && (
          <Icon
            size={30}
            color={theme.colors.secondary}
            style={{ padding: 4, marginRight: 5, marginLeft: '1rem' }}
          />
        )}

        <InputValue
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
        <OptionsList>
          {availableOptions.length > 0 && (
            <>
              <Option color={color} onClick={() => handleSelectAllOptions()}>
                <OptionLabel>Todos os itens</OptionLabel>
              </Option>

              {availableOptions.map((option) => (
                <Option
                  key={option.label}
                  isSelected={currentOptions?.includes(option)}
                  onClick={() => handleSelectOption(option)}
                  color={color}
                >
                  <OptionLabel>{option.label}</OptionLabel>
                </Option>
              ))}
            </>
          )}

          {availableOptions.length === 0 && (
            <Option>
              <OptionLabel>Sem itens para seleção</OptionLabel>
            </Option>
          )}
        </OptionsList>
      </OptionsContainer>
    </Container>
  );
};

export default ProjectMultiSelect;
