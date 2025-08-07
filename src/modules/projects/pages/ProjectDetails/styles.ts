import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 8rem;
  display: flex;
  flex-direction: column;
  animation: ${({ theme }) => theme.animations.appearFromBottom} 0.6s;
`;

export const Content = styled.form`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;

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
    height: 5px;
  }
`;

export const StepContent = styled.div<{ heightAuto?: boolean }>`
  width: 100%;
  height: 62%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  ${({ heightAuto }) =>
    heightAuto &&
    css`
      height: auto;
    `}
`;

export const FooterContainer = styled.div<{ isFirstStep: boolean }>`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ isFirstStep }) =>
    isFirstStep &&
    css`
      justify-content: flex-end;
    `}
`;
