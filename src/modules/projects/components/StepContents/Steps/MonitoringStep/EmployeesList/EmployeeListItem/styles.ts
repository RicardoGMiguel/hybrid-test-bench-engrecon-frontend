import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 3.5rem;
  padding: 1rem 2rem 1rem 2.5rem;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.exyGray};
  border-radius: 0.7rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 2.4rem;
    border: 1.4px solid ${({ theme }) => theme.colors.exyGray};
    padding: 0.7rem 1.4rem 0.7rem 1.8rem;
  }
`;

export const Label = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.exyGray};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
    padding-right: 0.7rem;
  }
`;
