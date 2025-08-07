import themeDefaults from '@style/themeDefaults';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const LoginLogo = styled.img`
  width: 246px;
`;

export const FormContainer = styled.div`
  width: 630px;
  height: 550px;
  border-radius: 2.8rem;
  padding: 4rem;
  background-color: ${themeDefaults.colors.exyGray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 440px;
    height: 385px;
    border-radius: 2rem;
    padding: 2.8rem;
  }

  div {
    color: ${themeDefaults.colors.orange};
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 14px;
  }
`;

export const ForgotContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    font-size: 1rem;
    color: ${themeDefaults.colors.white};
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 0.7rem;
    }

    &:hover {
      filter: ${themeDefaults.filters.hover};
    }
  }
`;
