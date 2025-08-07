import styled, { css } from 'styled-components';

import { IconBase } from 'react-icons';

interface ContainerInterface {
  isError: boolean;
  disabled?: boolean;
  isFocused?: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 3.5rem;
    gap: 7px;
  }

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
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.exyGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1rem;
  }
`;

export const Content = styled.div<ContainerInterface>`
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.colors.lightGray} solid 2px;
  color: ${({ theme }) => theme.colors.exyGray};
  padding: 0.3rem 1rem;
  border-radius: 10px;
  transition: 0.2s ease all;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  > svg {
    width: 30px;
    height: 30px;
    padding: 5px;
    color: ${({ theme }) => theme.colors.loginInputColor};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 20px;
      height: 20px;
      padding: 1px;
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
      background-color: ${theme.colors.lightGray};
    `}

    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.secondary}
      inset !important;
    -webkit-text-fill-color: black !important;
  }

  input {
    font-size: 1.2em;
    flex: 1;
    width: 80%;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding-left: 10px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 0.8em;
    }

    color: ${({ theme }) => theme.colors.loginInputColor};

    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
      `}
  }

  @media (max-width: 600px) {
    input {
      font-size: 1rem;
    }
  }
`;

export const ListIcon = styled(IconBase).attrs(({ theme }) => ({
  color: theme.colors.exyGray,
}))`
  pointer-events: none;
  width: 20px;
  height: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 14px;
    height: 14px;
  }
`;
