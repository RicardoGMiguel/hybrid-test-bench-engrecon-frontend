import styled, { css } from 'styled-components';

export const Container = styled.div<{ hasComparison: boolean }>`
  width: 300px;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ hasComparison }) =>
    hasComparison &&
    css`
      height: 300px;
    `}
`;

export const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.exyGray};
`;

export const Content = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomNeedleStripe = styled.div`
  position: absolute;
  bottom: 0;
  width: 49%;
  height: 95px;
  background-color: ${({ theme }) => theme.colors.exyGray};
  z-index: 100;
  border-top-right-radius: 95px;
  border-top-left-radius: 95px;
  padding: 8px;
  z-index: 1;

  > div {
    width: 100%;
    height: 100%;
    border-top-right-radius: 87px;
    border-top-left-radius: 87px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const ValueContainer = styled.div`
  position: absolute;
  bottom: -50px;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

export const LabelContainer = styled.div`
  width: 60%;
  height: 25px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Label = styled.p`
  width: 120px;
  text-align: center;
  font-size: 2.4rem;
  line-height: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.orange};
`;

export const MinMaxLabel = styled.p`
  width: 40px;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.exyGray};
`;

export const ComparisonContainer = styled.div`
  width: 86%;
  height: 45px;
  border-width: 0px 3px 3px 3px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.mediumGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

export const LeftContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  gap: 5px;
`;

export const ResultLabel = styled.p`
  font-size: 0.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.exyGray};
`;

export const PrevResult = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.exyGray};
`;

export const RightContainer = styled.div<{ state: 'up' | 'down' | 'keep' }>`
  display: flex;
  align-items: center;
  gap: 5px;

  > P {
    font-size: 1.3rem;
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
