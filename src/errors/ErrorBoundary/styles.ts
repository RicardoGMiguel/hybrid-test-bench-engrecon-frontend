import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex: 1;
  margin: 0 auto;
  animation: ${({ theme }) => theme.animations.appearFromBottom} 0.6s;
`;
