import styled, { css } from 'styled-components';

interface ContainerInterface {
  isError: boolean;
  disabled?: boolean;
  isFocused?: boolean;
}

export const Container = styled.div<ContainerInterface>`
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  border: ${({ theme }) => theme.colors.loginPlaceholderColor} solid 2px;
  padding: 0.5rem 0;
  border-radius: 10px;
  transition: 0.2s ease all;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.loginInputColor};

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border: ${theme.colors.secondary} solid 2px;
    `}

  ${({ theme, isError }) =>
    isError &&
    css`
      border-color: ${theme.colors.danger};
    `}

    ${({ theme, disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      border: ${theme.colors.inactive} solid 2px;
      color: ${theme.colors.inactive};
    `}

    font-size: 1.2rem;

  select {
    font-size: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    select {
      font-size: 1rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    select {
      font-size: 0.8rem;
    }
  }
`;
