import styled, { css } from 'styled-components';

import { IconBase } from 'react-icons';

interface ContainerInterface {
  isError: boolean;
  disabled?: boolean;
  isFocused?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.orange};
  }

  .react-datepicker__current-month {
    color: ${({ theme }) => theme.colors.orange};
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.colors.orange} !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const Label = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const Content = styled.div<ContainerInterface>`
  display: flex;
  width: 100%;
  height: 2.3rem;
  align-items: center;
  border: ${({ theme }) => theme.colors.lightGray} solid 2px;
  padding: 0rem 1rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  transition: 0.2s ease all;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding: 0rem 0.7rem;
    height: 1.8rem;
    gap: 7px;
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
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.secondary}
      inset !important;
    -webkit-text-fill-color: black !important;
  }

  input {
    width: 100%;
    display: flex;
    flex: 1;
    border: 0;
    background: transparent !important;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.loginInputColor};
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 0.8rem;
    }

    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
      `}
  }
`;

export const ListIcon = styled(IconBase).attrs(({ theme }) => ({
  size: 20,
  color: theme.colors.exyGray,
}))`
  width: 20px;
  height: 20px;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 14px;
    height: 14px;
  }
`;
