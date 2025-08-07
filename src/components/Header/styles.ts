import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.dt_red};

  box-shadow: ${({ theme }) => theme.shadows.outer};
`;

export const LogoContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  > img {
    height: 75px;
  }

  #engreconLogo {
    height: 40px;
    filter: brightness(0) invert(1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    > img {
      height: 35px;
    }
  }
`;

export const InformationsContent = styled.div`
  display: flex;
  align-items: center;

  > a {
    display: flex;
    align-items: center;

    > h4 {
      margin: 0 0.5rem;
    }

    svg {
      margin-right: 0.5rem;
    }

    &:nth-child(1) {
      margin-right: 1rem;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-right: 2.6rem;

  > h1 {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 1rem;
    }
  }

  > h2 {
    font-size: 1.2rem;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.white};
    font-style: italic;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 1rem;
    }
  }
`;
