import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  animation: ${({ theme }) => theme.animations.fadeIn} 0.6s;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const EvaluationSelectsContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Content = styled.div`
  width: 100%;
  height: auto;
`;
