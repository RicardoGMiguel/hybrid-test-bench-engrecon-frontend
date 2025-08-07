import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 3.5rem;
  padding: 1rem 2rem 1rem 2.5rem;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.exyGray};
  border-radius: 0.7rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 2.4rem;
    border: 1.4px solid ${({ theme }) => theme.colors.exyGray};
  }
`;

export const Label = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.exyGray};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const ButtonGap = styled.div<{ minWidth: number }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ minWidth }) =>
    css`
      min-width: ${minWidth}px;

      @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
        min-width: ${minWidth * 0.7}px;
      }
    `}
`;

export const IconButton = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.colors.exyGray};
    width: 25px;
    height: 25px;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 17px;
      height: 17px;
    }

    :hover {
      color: ${({ theme }) => theme.colors.exyGrayHover};
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      svg {
        color: ${({ theme }) => theme.colors.mediumGray};
        cursor: not-allowed;

        :hover {
          color: ${({ theme }) => theme.colors.mediumGray};
        }
      }
    `}
`;
