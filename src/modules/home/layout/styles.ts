import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 88%;
  padding: 2.5rem 5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 2100px) {
    padding: 1rem 2.5rem;
  }
`;
