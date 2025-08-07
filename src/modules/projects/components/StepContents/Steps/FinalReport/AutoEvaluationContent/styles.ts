import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  animation: ${({ theme }) => theme.animations.fadeIn} 0.6s;
`;

export const GaugesContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  row-gap: 20px;
`;
