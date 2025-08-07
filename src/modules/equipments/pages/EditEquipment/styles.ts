import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${({ theme }) => theme.animations.appearFromBottom} 0.6s;
`;

export const Header = styled.div`
  width: 100%;
  height: 7rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 4rem;
  }

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Content = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow-y: auto;

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

export const FormContainer = styled.div`
  width: 100%;
  flex: 1;
  padding: 0.5rem;
  padding-left: 0;
  display: flex;
  gap: 40px;
`;

export const InputColumn = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 3px;
  }
`;

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 0.3rem;
`;

export const NoErrorSeparator = styled.div`
  height: 1.4rem;
`;
