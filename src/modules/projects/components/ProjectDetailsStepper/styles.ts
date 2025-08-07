import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 30%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.exyGray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  padding: 2rem 4rem;
  padding-bottom: 3.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding: 1.4rem 2.8rem;
    padding-bottom: 2.6rem;
    border-radius: 7px;
  }
`;

export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;

export const InfoContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`;

export const LabelText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.lightGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.6rem;
  }
`;

export const ValueText = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1.2rem;
  }
`;

export const StepperContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StepperIconsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const StepperTracksContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding-left: 7px;
    padding-right: 7px;
  }
`;

export const StepperButtonsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
`;

export const WhiteTrack = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 7px;
  }
`;

export const StepperIcon = styled.div<{ active: boolean; isSmall: boolean }>`
  position: relative;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.orange};
  border: 6px solid ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  z-index: 1;
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 28px;
    height: 28px;
    border: 4.2px solid ${({ theme }) => theme.colors.white};
    border-radius: 4.2px;
  }

  ${({ active }) =>
    !active &&
    css`
      background-color: ${({ theme }) => theme.colors.white};
    `}

  ${({ isSmall }) =>
    isSmall &&
    css`
      width: 30px;
      height: 30px;
      margin: 6px;
      border: 4px solid ${({ theme }) => theme.colors.white};

      @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
        width: 20px;
        height: 20px;
        margin: 4.2px;
        border: 3px solid ${({ theme }) => theme.colors.white};
      }
    `}
`;

export const StepperButton = styled.div<{ isSmall: boolean }>`
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 6px;
  z-index: 3;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 32.2px;
    height: 32.2px;
    border-radius: 4.2px;
  }

  ${({ isSmall }) =>
    isSmall &&
    css`
      width: 34px;
      height: 34px;
      margin: 6px;

      @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
        width: 24.2px;
        height: 24.2px;
        margin: 4.2px;
      }
    `}
`;

export const StepperLabel = styled.p<{ isSmall: boolean }>`
  position: absolute;
  font-size: 0.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  top: calc(100% + 10px);
  width: 100px;
  left: calc(-50px - 6px + 20px);
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.5rem;
    width: 70px;
    left: calc(-35px - 6px + 15px);
  }

  ${({ isSmall }) =>
    isSmall &&
    css`
      top: calc(100% + 15px);
      left: calc(-50px - 6px + 15px);
    `}
`;

export const StepperSeparator = styled.div<{
  active: boolean;
}>`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.orange};
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 2.8px;
  }

  ${({ active }) =>
    !active &&
    css`
      background-color: transparent;
    `}
`;
