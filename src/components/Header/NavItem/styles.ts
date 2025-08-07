import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

interface ILabelProps {
  $isCurrentRoute: boolean;
}

export const Container = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  :hover {
    filter: ${({ theme }) => theme.filters.hover};
  }
`;

export const Label = styled.p<ILabelProps>`
  font-size: 1.25rem;
  line-height: normal;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dt_unselected};

  ${({ theme, $isCurrentRoute }) =>
    $isCurrentRoute &&
    css`
      color: ${theme.colors.white};
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1rem;
  }
`;
