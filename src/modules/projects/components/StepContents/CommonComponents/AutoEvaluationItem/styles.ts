import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Label = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.exyGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.8rem;
    margin-left: 7px;
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    margin-top: 7px;
  }
`;

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 5px;
  }
`;

export const OptionLabel = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.exyGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const OptionButton = styled.div<{ disabled?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 23px;
    height: 23px;
    border-radius: 7px;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    `}
`;

export const SelectedButton = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.orange};
  animation: ${({ theme }) => theme.animations.fadeIn} 0.8s;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-radius: 7px;
  }
`;

export const UnSelectedButton = styled.div<{ disabled?: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2.5px solid ${({ theme }) => theme.colors.orange};
  animation: ${({ theme }) => theme.animations.fadeIn} 0.8s;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-radius: 7px;
    border: 1.7px solid ${({ theme }) => theme.colors.orange};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.lightGray};
      border: 2.5px solid ${({ theme }) => theme.colors.mediumGray};
    `}
`;
