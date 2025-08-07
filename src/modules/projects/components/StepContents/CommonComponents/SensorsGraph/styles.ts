import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.exyGray};
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Legend = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  gap: 10px;

  > div {
    width: 20px;
    height: 20px;

    ${({ backgroundColor }) =>
      backgroundColor &&
      css`
        background-color: ${backgroundColor};
      `}
  }

  > p {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.exyGray};
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
