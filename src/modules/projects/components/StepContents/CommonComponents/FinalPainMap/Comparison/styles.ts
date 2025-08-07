import styled, { css } from 'styled-components';

export const Container = styled.div<{ posX: number; posY: number }>`
  width: 130px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  gap: 5px;

  ${({ posX, posY }) =>
    css`
      left: ${posX}px;
      top: ${posY}px;
    `}
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const ResultLabel = styled.p`
  font-size: 0.55rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.exyGray};
  line-height: 0.65rem;
  text-align: center;
`;

export const PrevResult = styled.p`
  font-size: 1.6rem;
  line-height: 1.6rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.exyGray};
`;

export const RightContainer = styled.div<{ state: 'up' | 'down' | 'keep' }>`
  display: flex;

  align-items: center;
  justify-content: space-between;

  > P {
    font-size: 1rem;
    font-weight: 700;
  }

  ${({ state, theme }) => {
    if (state === 'up') {
      return css`
        > svg {
          color: ${theme.colors.gaugeFifthColor};
        }
        > p {
          color: ${theme.colors.gaugeFifthColor};
        }
      `;
    }
    if (state === 'down') {
      return css`
        > svg {
          color: ${theme.colors.gaugeFirstColor};
        }
        > p {
          color: ${theme.colors.gaugeFirstColor};
        }
      `;
    }
    return css`
      > svg {
        color: ${theme.colors.mediumGray};
      }
      > p {
        color: ${theme.colors.mediumGray};
      }
    `;
  }}
`;
