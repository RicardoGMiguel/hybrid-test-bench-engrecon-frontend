import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 28px;
  }
`;

export const Label = styled.p<{ selected: boolean }>`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.exyGray};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1rem;
  }

  ${({ selected }) =>
    !selected &&
    css`
      color: ${({ theme }) => theme.colors.mediumGray};
    `}
`;
