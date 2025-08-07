import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.exyGray};
  padding-right: 1rem;
  padding-left: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    min-height: 38px;
    padding-right: 0.7rem;
    padding-left: 0.7rem;
    border-bottom: 0.35px solid ${({ theme }) => theme.colors.exyGray};
  }
`;

export const NameText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.exyGray};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const ButtonsContainer = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 7px;
  }
`;

export const IconButton = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
    width: 25px;
    height: 25px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 17px;
      height: 17px;
    }
  }

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      > svg {
        color: ${({ theme }) => theme.colors.mediumGray};
      }

      &:hover {
        filter: none;
      }
    `}
`;

export const AnswerButton = styled.button<{ disabled: boolean }>`
  width: 100px;
  height: 27px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1.5px solid ${({ theme }) => theme.colors.exyGray};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 7px;
  color: ${({ theme }) => theme.colors.exyGray};
  font-size: 0.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 70px;
    height: 19px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.exyGray};
    font-size: 0.6rem;
  }

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      color: ${({ theme }) => theme.colors.mediumGray};
      border: 1.5px solid ${({ theme }) => theme.colors.mediumGray};

      &:hover {
        filter: none;
      }
    `}
`;
