import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: ${({ theme }) => theme.animations.fadeIn} 0.6s;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  padding-left: 0;
  display: flex;
  gap: 5%;
  row-gap: 40px;
  flex-wrap: wrap;
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
