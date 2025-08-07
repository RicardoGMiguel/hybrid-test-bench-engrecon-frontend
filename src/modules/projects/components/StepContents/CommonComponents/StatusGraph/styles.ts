import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.exyGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1.1rem;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;
