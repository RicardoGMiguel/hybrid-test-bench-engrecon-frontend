import styled from 'styled-components';

export const Container = styled.div`
  width: 450px;
  height: 160px;
  background-color: ${({ theme }) => theme.colors.exyGray};
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 25px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 315px;
    height: 112px;
    border-radius: 14px;
    padding: 1.4rem;
    gap: 17px;
  }

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }
`;

export const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 42px;
    height: 42px;
    border-radius: 7px;
  }

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
    width: 30px;
    height: 30px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 21px;
      height: 21px;
    }
  }
`;

export const Label = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1rem;
  }
`;
