import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
`;

export const Content = styled.div<{ deleted?: boolean }>`
  width: 100%;
  height: 4rem;
  padding: 1rem 2rem 1rem 2.5rem;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.exyGray};
  border-radius: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 3rem;
    padding: 0.7rem 1.5rem 0.7rem 2rem;
    border-radius: 0.7rem;
    border: 0.5px solid ${({ theme }) => theme.colors.exyGray};
  }

  ${({ deleted }) =>
    deleted &&
    css`
      background-color: ${({ theme }) => theme.colors.lightGray};
      border: 2px solid ${({ theme }) => theme.colors.mediumGray};

      @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
        border: 0.5px solid ${({ theme }) => theme.colors.mediumGray};
      }
    `}
`;

export const Label = styled.p<{ deleted?: boolean }>`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.exyGray};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1rem;

  ${({ deleted }) =>
    deleted &&
    css`
      color: ${({ theme }) => theme.colors.mediumGray};
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.8rem;
  }
`;

export const ButtonGap = styled.div<{ minWidth: number }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${({ minWidth }) =>
    css`
      min-width: ${minWidth}px;
    `}
`;

export const IconButton = styled.div<{ disabled?: boolean; deleted?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.colors.orange};
    cursor: pointer;
    width: 25px;
    height: 25px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 20px;
      height: 20px;
    }

    :hover {
      color: ${({ theme }) => theme.colors.hoverOrange};
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

  ${({ deleted }) =>
    deleted &&
    css`
      svg {
        color: ${({ theme }) => theme.colors.exyGray};

        :hover {
          color: ${({ theme }) => theme.colors.exyGrayHover};
        }
      }
    `}
`;
