import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.exyGray};
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 55px;
`;

export const ImageContainer = styled.div`
  height: 500px;
  position: relative;
`;

export const PainMapImg = styled.img`
  height: 100%;
`;

export const LabelContainer = styled.div<{ posX: number; posY: number }>`
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  position: absolute;

  ${({ posX, posY }) =>
    css`
      left: ${posX}px;
      top: ${posY}px;
    `}
`;

export const Label = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 1.2rem;
`;

export const Value = styled.p<{ value: number }>`
  font-size: 1.6rem;
  font-weight: 700;

  ${({ value, theme }) => {
    if (value <= 2) {
      return css`
        color: ${theme.colors.gaugeFirstColor};
      `;
    }
    if (value > 2 && value <= 4) {
      return css`
        color: ${theme.colors.gaugeSecondColor};
      `;
    }
    if (value > 4 && value <= 6) {
      return css`
        color: ${theme.colors.gaugeThirdColor};
      `;
    }
    if (value > 6 && value <= 8) {
      return css`
        color: ${theme.colors.gaugeFourthColor};
      `;
    }
    return css`
      color: ${theme.colors.gaugeFifthColor};
    `;
  }}
`;
