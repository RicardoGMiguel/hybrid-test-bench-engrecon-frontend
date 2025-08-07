import styled, { css } from 'styled-components';

export const Container = styled.div<{ deleted: boolean }>`
  width: 30%;
  height: 475px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.exyGray};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 3rem;

  ${({ deleted }) =>
    deleted &&
    css`
      background-color: ${({ theme }) => theme.colors.mediumGray};
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding: 1.4rem 2.25rem;
    height: 330px;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 7px;
  }
`;

export const IconButton = styled.div<{ deleted: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }

  svg {
    color: ${({ theme }) => theme.colors.orange};
    width: 30px;
    height: 30px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 20px;
      height: 20px;
    }
  }

  ${({ deleted }) =>
    deleted &&
    css`
      svg {
        color: ${({ theme }) => theme.colors.exyGray};
      }
    `}
`;

export const CompanyText = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1.4rem;
  }
`;

export const ValueText = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1.26rem;
  }
`;

export const LabelText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.lightGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BottomInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AccessButton = styled.button<{ deleted: boolean }>`
  width: 120px;
  height: 36px;
  border-radius: 18px;
  border: 3px solid ${({ theme }) => theme.colors.orange};
  background-color: ${({ theme }) => theme.colors.exyGray};
  color: ${({ theme }) => theme.colors.orange};
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1;
  align-self: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 100px;
    height: 28px;
    font-size: 1rem;
    border: 2px solid ${({ theme }) => theme.colors.orange};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.exyGray};
  }

  ${({ deleted }) =>
    deleted &&
    css`
      border: 3px solid ${({ theme }) => theme.colors.exyGray};
      background-color: ${({ theme }) => theme.colors.mediumGray};
      color: ${({ theme }) => theme.colors.exyGray};

      &:hover {
        background-color: ${({ theme }) => theme.colors.darkGray};
        color: ${({ theme }) => theme.colors.mediumGray};
      }

      @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
        border: 2px solid ${({ theme }) => theme.colors.exyGray};
      }
    `}
`;
