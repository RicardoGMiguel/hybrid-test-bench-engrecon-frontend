import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 360px;
    height: 50px;
  }
`;

export const ConfirmationButton = styled.div`
  width: 10rem;
  height: 3.2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors.exyGray};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 7rem;
    height: 2.2rem;
    gap: 7px;
    border-radius: 8.4px;
    border: 1.4px solid ${({ theme }) => theme.colors.exyGray};
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }

  > p {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.exyGray};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 0.8rem;
    }
  }

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
    width: 25px;
    height: 25px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 17px;
      height: 17px;
    }
  }
`;

export const CancelButton = styled.div`
  width: 10rem;
  height: 3.2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.exyGray};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 7rem;
    height: 2.2rem;
    gap: 7px;
    border-radius: 8.4px;
    border: 1.4px solid ${({ theme }) => theme.colors.exyGray};
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.exyGrayHover};
  }

  > p {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 0.8rem;
    }
  }

  > svg {
    color: ${({ theme }) => theme.colors.white};
    width: 25px;
    height: 25px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 17px;
      height: 17px;
    }
  }
`;
