import styled, { css } from 'styled-components';

export const Container = styled.div<{ fontSize?: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > p {
    font-size: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.exyGray};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 1.2rem;
    }
  }

  ${({ fontSize }) =>
    css`
      > p {
        font-size: ${fontSize}rem;

        @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
          font-size: ${(fontSize || 1) * 0.7}rem;
        }
      }
    `}
`;
