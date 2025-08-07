import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${({ theme }) => theme.animations.fadeIn} 0.6s;
`;

export const Header = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Content = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const EmployeeListContainer = styled.div`
  width: 50%;
  height: 100%;
`;

export const GraphAndValuesContainer = styled.div`
  width: 48%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.exyGray};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-radius: 7px;
  }
`;

export const ValuesContainer = styled.div`
  width: 45%;
  height: 100%;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding: 0.9rem;
  }
`;

export const GraphContainer = styled.div`
  width: 55%;
  height: 100%;
  padding: 0.7rem 1.3rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-radius: 7px;
  }
`;
