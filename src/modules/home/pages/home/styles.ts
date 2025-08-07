import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${({ theme }) => theme.animations.appearFromBottom} 0.6s;
`;

export const Header = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 92%;
  padding: 0.5rem;
  padding-left: 0;
  display: flex;
  align-items: center;
`;

export const LeftContainer = styled.div`
  width: 30%;
  height: 100%;
  padding: 1rem;

  > div {
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.lightGray};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
  }
`;

export const RightContainer = styled.div`
  width: 70%;
  height: 100%;
  padding: 1rem;

  > div {
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.lightGray};
    border-radius: 1rem;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Info = styled.div`
  width: 100%;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoTitle = styled.h1`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.dt_gray};
`;

export const InfoLabel = styled.h1`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.dt_gray};
`;

export const InfoText = styled.h1`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.dt_font};
`;

export const CouplingModeButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const RadioButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ButtonLabel = styled.h1`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.dt_font};
`;

export const RadioButton = styled.div<{ selected: boolean }>`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 0.7rem;
  border: solid 1px ${({ theme }) => theme.colors.dt_gray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > div {
    width: 70%;
    height: 70%;
    border-radius: 100px;
    background-color: transparent;

    ${({ selected }) =>
      selected &&
      css`
        background-color: ${({ theme }) => theme.colors.dt_red};
      `}
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
