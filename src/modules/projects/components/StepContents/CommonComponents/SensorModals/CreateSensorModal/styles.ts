import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.form`
  width: 100%;
  padding: 1.5rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    padding: 1.1rem;
    padding-left: 0.7rem;
    gap: 28px;
  }
`;

export const NameAndDateContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 14px;
  }
`;
