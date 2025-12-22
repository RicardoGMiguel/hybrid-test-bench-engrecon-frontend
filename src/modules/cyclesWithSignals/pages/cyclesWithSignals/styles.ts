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
  width: 40%;
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
  width: 60%;
  height: 100%;
  padding: 1rem;
  display: flex;

  > div {
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.lightGray};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding: 2rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Info = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-bottom: 1rem;
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

export const InfoText = styled.h1<{ color?: string }>`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.dt_font};

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;

export const CycleSelectionButtons = styled.div`
  width: 100%;
  gap: 3rem;
  display: flex;
  flex-wrap: wrap;
`;

export const RadioButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ButtonLabel = styled.h1`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.dt_font};
`;

export const RadioButton = styled.div<{
  selected: boolean;
  disabled?: boolean;
}>`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 0.7rem;
  border: solid 1px ${({ theme }) => theme.colors.dt_gray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}

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
  gap: 2rem;
`;

export const CurrentStatusContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  gap: 1rem;
`;

export const IconsContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Icon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PedalValue = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

export const VehicleImg = styled.img`
  height: 300px;
`;

export const RedArrow = styled.img<{ visible: boolean }>`
  position: absolute;
  top: 50.5%;
  left: 70%;
  height: 20%;
  width: 10%;
  display: flex;

  ${({ visible }) =>
    !visible &&
    css`
      display: none;
    `}
`;

export const BlueArrow = styled.img<{ visible: boolean }>`
  position: absolute;
  top: 50.5%;
  left: 55%;
  height: 20%;
  width: 10%;
  display: flex;

  ${({ visible }) =>
    !visible &&
    css`
      display: none;
    `}
`;

export const GearIndicator = styled.h1`
  position: absolute;
  top: 20%;
  left: 60%;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const IconImg = styled.img`
  width: 100px;
`;
