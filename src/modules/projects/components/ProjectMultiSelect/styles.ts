import styled, { css } from 'styled-components';

import { IconBase } from 'react-icons';
import { FiXCircle } from 'react-icons/fi';

interface IContentProps {
  disabled?: boolean;
  isError: boolean;
  isFocused?: boolean;
  color?: 'light' | 'dark';
}

interface IOptionsContainerProps {
  isActive?: boolean;
  starterAnimation?: boolean;
  direction: 'up' | 'down';
  color?: 'light' | 'dark';
}

interface IOptionProps {
  isSelected?: boolean;
  color?: 'light' | 'dark';
}

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  user-select: none;
`;

export const Label = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const InputValue = styled.input`
  width: 100%;
  height: 2rem;
  display: flex;
  flex: 1;
  border: 0;
  background: transparent !important;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.exyGray};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 1rem;
    font-size: 0.7rem;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.loginPlaceholderColor};
  }
`;

export const Content = styled.div<IContentProps>`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  gap: 5px;
  padding: 0.125rem 1rem;
  border: ${({ theme }) => theme.colors.lightGray} solid 2px;
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.colors.lightGray};
  transition: 0.2s ease all;
  color: ${({ theme }) => theme.colors.loginInputColor};
  cursor: pointer;

  transition: 0.2s ease all;

  & > button {
    svg {
      color: ${({ theme }) => theme.colors.loginInputColor};
    }
  }

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border: ${theme.colors.mediumGray} solid 2px;
    `}

  ${({ theme, isError }) =>
    isError &&
    css`
      border-color: ${theme.colors.orange};
    `}

  ${({ theme, disabled }) =>
    disabled &&
    css`
      background-color: ${theme.colors.lightGray};
      color: ${theme.colors.exyGray};
      border: ${theme.colors.lightGray} solid 2px;
      cursor: not-allowed;

      ${InputValue} {
        color: ${theme.colors.exyGray};
        cursor: not-allowed;

        &::placeholder {
          color: ${theme.colors.loginPlaceholderColor};
        }
      }
    `}

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.exyGray} inset !important;
    -webkit-text-fill-color: black !important;
  }

  @media (max-width: 600px) {
    input {
      font-size: 1rem;
    }
  }
`;

export const ListIcon = styled(IconBase).attrs(({ theme }) => ({
  size: 20,
  color: theme.colors.exyGray,
}))`
  pointer-events: none;
`;

export const OptionsContainer = styled.div<IOptionsContainerProps>`
  position: absolute;
  top: calc(100% + 10px);
  width: 100%;
  max-height: 160px;
  display: none;
  padding-right: 2px;
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.shadows.outer};

  ${({ isActive }) =>
    isActive &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    `}
`;

export const OptionsList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-right: 2px;
  overflow: auto;

  &::-webkit-scrollbar-track {
    padding: 0 2px;
    margin: 2px 0;
    border-radius: 0px;
    background: ${({ theme }) => theme.colors.exyGray};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.darkGray};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.black};
  }

  &::-webkit-scrollbar {
    width: 12px;
  }
`;

export const Option = styled.div<IOptionProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  user-select: none;

  ${({ theme, isSelected }) =>
    isSelected &&
    css`
      background-color: ${theme.colors.exyGray};
    `}

  :hover {
    filter: ${({ theme }) => theme.filters.hover};
  }

  :active {
    filter: ${({ theme }) => theme.filters.active};
  }
`;

export const OptionLabel = styled.p<IOptionProps>`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.exyGray};

  ${({ theme, isSelected }) =>
    isSelected &&
    css`
      color: ${theme.colors.white};
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const SelectedOptionsContainer = styled.div`
  display: ${({ hidden }) => (hidden ? 'hidden' : 'flex')};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0.1rem 0;
  padding: 0.25rem 0;
  gap: 0.5rem;
  overflow: auto;

  animation: ${({ theme }) => theme.animations.fadeIn} 150ms;

  &::-webkit-scrollbar-track {
    padding: 0 2px;
    margin: 2px 0;
    border-radius: 0px;
    background: ${({ theme }) => theme.colors.exyGray};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.mediumGray};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.black};
  }

  &::-webkit-scrollbar {
    height: 0.45rem;
  }
`;

export const OptionTag = styled.div`
  min-width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.1rem 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 0.875rem;

  animation: ${({ theme }) => theme.animations.fadeIn} 100ms;
`;

export const OptionTagLabel = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const OptionTagRemove = styled(FiXCircle).attrs(({ theme }) => ({
  size: 20,
  color: theme.colors.white,
}))<{ disabled?: boolean }>`
  cursor: pointer;

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }

  &:active {
    filter: ${({ theme }) => theme.filters.active};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;

      &:hover {
        filter: none;
      }
      &:active {
        filter: none;
      }
    `}
`;
