import styled from 'styled-components';

export const Container = styled.div`
  height: 40px;
  background-color: ${({ theme }) => theme.colors.exyGray};
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 25px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 28px;
    border-radius: 5px;
  }

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }
`;

export const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 21px;
    height: 21px;
    border-radius: 1.4px;
  }

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
    width: 20px;
    height: 20px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 14px;
      height: 14px;
    }
  }
`;

export const Label = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.8rem;
  }
`;
