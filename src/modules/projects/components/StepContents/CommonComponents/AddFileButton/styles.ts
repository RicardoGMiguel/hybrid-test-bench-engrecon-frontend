import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.exyGray};
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 25px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-radius: 7px;
    padding: 0.7rem;
    gap: 17px;
  }

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 28px;
    height: 28px;
    border-radius: 7px;
  }

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
  }
`;

export const Label = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 1700px) {
    font-size: 0.8rem;
  }
`;
