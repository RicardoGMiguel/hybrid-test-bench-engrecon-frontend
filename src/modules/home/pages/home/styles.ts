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

export const ModeSelectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-right: 1.5rem;
`;

export const ModeSelectionButton = styled.h1<{ selected: boolean }>`
  font-size: 1.8rem;
  font-weight: bold;
  color: #000;
  cursor: pointer;

  ${({ selected }) =>
    !selected &&
    css`
      color: #ccc;
    `}
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
    justify-content: space-between;
    padding: 2rem;

    > form {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
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
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
`;

export const Info = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

export const InfoTitle = styled.h1`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.dt_gray};

  @media (max-width: 2100px) {
    font-size: 1.2rem;
  }
`;

export const InfoLabel = styled.h1`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.dt_gray};

  @media (max-width: 2100px) {
    font-size: 1.1rem;
  }
`;

export const InfoText = styled.h1<{ color?: string }>`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.dt_font};

  @media (max-width: 2100px) {
    font-size: 1.1rem;
  }

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
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
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.dt_font};

  @media (max-width: 2100px) {
    font-size: 1rem;
  }
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

  @media (max-width: 2100px) {
    width: 1rem;
    height: 1rem;
  }

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
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
`;

export const ConfigTestChartContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: calc(100% + 80px);
  width: 800px;
  height: 600px;
  background-color: #fafbfc;
  border-radius: 20px;
  z-index: 10;

  box-shadow: 4px 5px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 4px 5px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 5px 5px 0px rgba(0, 0, 0, 0.75);
  ${({ isOpen }) =>
    !isOpen &&
    css`
      display: none;
    `}
`;
