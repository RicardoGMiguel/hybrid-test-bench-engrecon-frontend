import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;
  align-items: center;
  padding: 1.5rem 3rem 1.5rem 2.5rem;
  border-radius: 0.2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 2rem;
    padding: 1rem 2.25rem 1rem 2rem;
  }
`;

export const Label = styled.p`
  font-size: 1.2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.exyGray};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.8rem;
  }
`;

export const ButtonGap = styled.div<{ minWidth: number }>`
  height: 100%;
  height: 1.2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 0.9rem;
  }

  ${({ minWidth }) =>
    css`
      min-width: ${minWidth}px;
    `}
`;
