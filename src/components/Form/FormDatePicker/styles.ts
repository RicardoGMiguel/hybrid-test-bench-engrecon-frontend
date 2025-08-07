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
  max-height: 5.25rem;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 7px;
    max-height: 3.85rem;
  }

  .react-datepicker__header__dropdown {
    margin-top: 12px;
    margin-bottom: 8px;
  }

  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__year-read-view--down-arrow {
    width: 10px;
    height: 10px;
    border-color: ${({ theme }) => theme.colors.orange} !important;
    cursor: pointer;
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

export const Label = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
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
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: ${({ theme }) => theme.colors.lightGray} solid 2px;
  padding: 0.3rem 1rem;
  border-radius: 10px;
  transition: 0.2s ease all;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  > svg {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.colors.loginInputColor};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 20px;
      height: 20px;
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

    color: ${({ theme }) => theme.colors.loginInputColor};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 0.8em;
    }

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
  size: 20,
  color: theme.colors.exyGray,
}))`
  pointer-events: none;
`;
