import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${({ theme }) => theme.animations.appearFromBottom} 0.6s;
`;

export const Header = styled.div`
  width: 100%;
  height: 10%;
  padding-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RightHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 20px;
  }
`;

export const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 30px;
    height: 30px;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 7px;
  }
`;

export const RadioButton = styled.div<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.exyGray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > div {
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: ${({ theme }) => theme.colors.orange};

    ${({ selected }) =>
      !selected &&
      css`
        display: none;
      `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 16px;
    height: 16px;
    border-radius: 8px;
    border: 1.4px solid ${({ theme }) => theme.colors.exyGray};

    > div {
      width: 10px;
      height: 10px;
      border-radius: 5px;
    }
  }
`;

export const RadioButtonLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.exyGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 90%;
  padding: 0.5rem;
  padding-left: 0;
  display: flex;

  &::-webkit-scrollbar-track {
    padding: 0 2px;
    margin: 2px 0;
    border-radius: 0px;
    background: ${({ theme }) => theme.colors.white};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.exyGray};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.black};
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
`;
