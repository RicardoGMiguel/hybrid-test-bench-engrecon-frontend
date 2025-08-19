import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: 100%;
    height: 2.5rem;
    border: ${({ theme }) => theme.colors.mediumGray} solid 2px;
    background-color: ${({ theme }) => theme.colors.warmGrayBackground};
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > h1 {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.dt_font};
  }
`;
