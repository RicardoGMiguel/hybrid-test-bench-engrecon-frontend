import styled from 'styled-components';

export const Container = styled.input`
  width: 15rem;
  min-width: 10rem;
  padding: 0 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.exyGray};
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.exyGray};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.white};
  }
`;
