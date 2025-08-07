import styled, { css } from 'styled-components';

import { IconBase } from 'react-icons';

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

interface IOptionsList {
  color?: 'light' | 'dark';
}

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  user-select: none;
`;

export const InputValue = styled.input`
  width: 100%;
  height: 100%;
  display: flex;
  border: 0;
  background: transparent !important;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.exyGray};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.loginPlaceholderColor};
  }
`;

export const Content = styled.div<IContentProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  gap: 5px;
  padding: 0.125rem 1rem;
  border: ${({ theme }) => theme.colors.lightGray} solid 2px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.loginInputColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-radius: 7px;
  }

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
  color: theme.colors.orange,
}))`
  pointer-events: none;
  width: 35px;
  height: 35px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 20px;
    height: 20px;
  }
`;

export const OptionsContainer = styled.div<IOptionsContainerProps>`
  position: absolute;
  top: calc(100% + 10px);
  width: 100%;
  max-height: 200px;
  display: none;
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.shadows.outer};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    max-height: 140px;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    `}
`;

export const OptionsList = styled.div<IOptionsList>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-right: 2px;
  padding-left: 2px;

  overflow: auto;

  &::-webkit-scrollbar-track {
    padding: 0 2px;
    margin: 2px 0;
    border-radius: 0px;
    background: ${({ theme, color }) =>
      color === 'light' ? theme.colors.lightGray : theme.colors.lightGray};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme, color }) =>
      color === 'light' ? theme.colors.lightGray : theme.colors.exyGray};
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
  background-color: ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
  user-select: none;

  ${({ theme, isSelected }) =>
    isSelected &&
    css`
      background-color: ${theme.colors.orange};
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

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }

  ${({ theme, isSelected }) =>
    isSelected &&
    css`
      color: ${theme.colors.white};
    `}
`;
