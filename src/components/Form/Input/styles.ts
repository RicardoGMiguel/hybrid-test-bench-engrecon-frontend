import { FiAlertCircle } from 'react-icons/fi';
import styled, { css } from 'styled-components';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';

interface ContainerInterface {
  isError: boolean;
  disabled?: boolean;
  isFocused?: boolean;
}

export const InputComponent = styled.input`
  background: transparent !important;
`;

export const Container = styled.div<ContainerInterface>`
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.colors.loginPlaceholderColor} solid 2px;
  padding: 0.5rem 1rem;
  border-radius: 10rem;
  transition: 0.2s ease all;
  cursor: text;

  & > button {
    svg {
      color: ${({ theme }) => theme.colors.loginInputColor};
    }
  }

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
      color: ${theme.colors.inactive};
      border: ${theme.colors.inactive} solid 2px;
    `}

    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.mediumGray}
      inset !important;
    -webkit-text-fill-color: black !important;
  }

  input {
    font-size: 1.2em;
    flex: 1;
    width: 80%;
    background: transparent;
    border: 0;

    color: ${({ theme }) => theme.colors.loginInputColor};

    ${({ theme, disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
        color: ${theme.colors.inactive};

        &::placeholder {
          color: ${theme.colors.inactive};
        }
      `}
  }

  @media (max-width: 600px) {
    input {
      font-size: 1rem;
    }
  }
`;

export const ErrorIcon = styled(FiAlertCircle).attrs(({ theme }) => ({
  color: `${theme.colors.danger}`,
  fill: `${theme.colors.backgroundLight}`,
  size: 22,
}))``;

export const CheckIcon = styled(BsCheck).attrs(({ theme }) => ({
  color: `${theme.colors.according}`,
  size: 22,
}))`
  margin: 0 5px;
`;

export const EyeIcon = styled(AiFillEye).attrs(() => ({
  size: 22,
}))``;

export const ClosedEyeIcon = styled(AiFillEyeInvisible).attrs(() => ({
  size: 22,
}))``;
