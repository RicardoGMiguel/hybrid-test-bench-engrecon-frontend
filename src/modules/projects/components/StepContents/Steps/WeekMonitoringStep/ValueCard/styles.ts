import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-radius: 7px;
  }
`;

export const LeftStripe = styled.div<{ color?: string }>`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 100%;
  width: 6%;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }

  ${({ color }) =>
    color &&
    css`
      background-color: ${color};
    `}
`;

export const Content = styled.div`
  width: 94%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const Value = styled.p`
  text-align: center;
  line-height: 3.5rem;
  font-size: 3.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.exyGray};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    line-height: 2.4rem;
    font-size: 2.4rem;
  }
`;

export const Label = styled.p`
  width: 45%;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.exyGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 0.7rem;
  }
`;
