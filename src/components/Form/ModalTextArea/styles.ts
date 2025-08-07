import styled, { css } from 'styled-components';

interface ContainerInterface {
  isError: boolean;
  disabled?: boolean;
  isFocused?: boolean;
  height?: number;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 7px;
  }
`;

export const Label = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.exyGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.8rem;
  }
`;

export const InputComponent = styled.textarea`
  background: transparent !important;
`;

export const Content = styled.div<ContainerInterface>`
  display: flex;
  width: 100%;
  height: 160px;
  align-items: center;
  align-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.colors.exyGray} solid 3px;
  padding: 1rem 0.8rem;
  border-radius: 10px;
  transition: 0.2s ease all;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 90px;
    border-radius: 7px;
    border: ${({ theme }) => theme.colors.exyGray} solid 2px;
  }

  cursor: text;

  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border: ${theme.colors.mediumGray} solid 2px;
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
      background-color: ${theme.colors.backgroundDisabled};
    `}

    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.mediumGray}
      inset !important;
    -webkit-text-fill-color: black !important;
  }

  textarea {
    font-size: 1.2em;
    height: 100%;
    width: 100%;
    resize: none;
    background: transparent;
    border: 0;
    padding-right: 0.5rem;
    color: ${({ theme }) => theme.colors.loginInputColor};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 0.8em;
    }

    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
      `}

    &::-webkit-scrollbar-track {
      padding: 0 2px;
      margin: 2px 0;
      border-radius: 0px;
      background: ${({ theme }) => theme.colors.white};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: ${({ theme }) => theme.colors.exyGray};
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.black};
    }

    &::-webkit-scrollbar {
      width: 5px;
    }
  }

  @media (max-width: 600px) {
    input {
      font-size: 1rem;
    }
  }
`;
