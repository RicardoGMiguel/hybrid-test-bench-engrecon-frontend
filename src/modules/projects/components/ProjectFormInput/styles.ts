import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { FiAlertCircle } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import styled, { css } from 'styled-components';

interface ContainerInterface {
  isError: boolean;
  disabled?: boolean;
  isFocused?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const InputComponent = styled(InputMask)`
  background: transparent !important;
`;

export const Content = styled.div<ContainerInterface>`
  display: flex;
  width: 100%;
  height: 2.3rem;
  align-items: center;
  align-content: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: ${({ theme }) => theme.colors.lightGray} solid 2px;
  padding: 0rem 1rem;
  border-radius: 10px;
  transition: 0.2s ease all;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: text;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding: 0rem 0.7rem;
    height: 1.8rem;
  }

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

  input {
    font-size: 1.2rem;
    flex: 1;
    width: 80%;
    background: transparent;
    border: 0;

    color: ${({ theme }) => theme.colors.loginInputColor};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 1rem;
    }

    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
      `}
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
