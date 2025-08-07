import themeDefaults from '@style/themeDefaults';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: ${themeDefaults.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1.4rem;
  }
`;

export const Message = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${themeDefaults.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1rem;
  }
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

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 14px;
    margin-top: 1.8rem;
  }
`;
