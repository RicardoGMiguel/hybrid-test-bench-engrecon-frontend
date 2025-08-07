import { FormErrorMessage } from '@chakra-ui/react';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${({ theme }) => theme.animations.appearFromBottom} 0.6s;
`;

export const Content = styled.form`
  width: 100%;
  height: 100%;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FirstFormContainer = styled.div`
  width: 100%;
  height: 22%;
  padding-bottom: 1.5rem;
`;

export const FirstForm = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.exyGray};
  border-radius: 10px;
  padding: 2rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const SecondFormContainer = styled.div`
  width: 100%;
  height: 72%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.5rem;
`;

export const ProjectEmployeesContainer = styled.div`
  width: 58%;
  height: 100%;
`;

export const SecondForm = styled.div`
  width: 40%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.exyGray};
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding: 1.4rem;
  }
`;

export const FooterContainer = styled.div`
  width: 100%;
  height: 6%;
  display: flex;
  justify-content: space-between;
`;

export const LeftButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  gap: 20px;
`;

export const NoErrorSeparator = styled.div`
  height: 1.6rem;
`;

export const CustomFormErrorMessage = styled(FormErrorMessage)`
  color: ${({ theme }) => theme.colors.orange} !important;
`;
