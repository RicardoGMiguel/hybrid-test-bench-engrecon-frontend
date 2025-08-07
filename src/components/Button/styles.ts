import styled, { css } from 'styled-components';

interface IContainerProps {
  $outlined?: boolean;
  $alt?: boolean;
  disabled?: boolean;
  $loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  borderRadius: number;
  backgroundColor?: string;
  borderColor?: string;
}

export const Label = styled.p<{ labelColor?: string }>`
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.colors.white};

  ${({ labelColor }) =>
    labelColor &&
    css`
      color: ${labelColor};
    `}
`;

export const Container = styled.button<IContainerProps>`
  height: ${({ size }) => (size === 'sm' ? 30 : size === 'md' ? 40 : 50)}px;
  min-width: 120px;
  max-width: 260px;
  padding: 12px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.2em;
  border: 2px solid ${({ theme }) => theme.colors.orange};
  background-color: ${({ theme }) => theme.colors.orange};
  user-select: none;
  transition: 0.2s ease all;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: ${({ size }) => (size === 'sm' ? 22 : size === 'md' ? 32 : 42)}px;
    min-width: 84px;
    max-width: 182px;
    font-size: 0.8em;
  }

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }

  &:active {
    filter: ${({ theme }) => theme.filters.active};
  }

  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
      border: 3px solid ${backgroundColor};
    `}

  ${({ borderColor }) =>
    borderColor &&
    css`
      border: 3px solid ${borderColor};
    `}

  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
    `}

  ${({ theme, $outlined }) =>
    $outlined &&
    css`
      background-color: ${theme.colors.white};

      ${Label} {
        color: ${theme.colors.primary};
      }
    `}

  ${({ theme, $alt }) =>
    $alt &&
    css`
      background-color: ${theme.colors.warmGray};
      border: 2px solid ${theme.colors.warmGray};

      ${Label} {
        color: ${theme.colors.warmGrayMinus3};
      }
    `}

  ${({ theme, disabled, $loading }) =>
    (disabled || $loading) &&
    css`
      border: 2px solid ${theme.colors.mediumGray};
      background-color: ${theme.colors.mediumGray};
      filter: none !important;

      ${Label} {
        color: ${theme.colors.warmGrayBackground};
      }
    `}

      ${({ $loading }) => $loading && 'cursor: progress;'}
      ${({ disabled }) => disabled && 'cursor: not-allowed;'}

  ${Label} {
    font-size: ${({ size }) =>
      size === 'sm' ? 16 : size === 'md' ? 18 : 20}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    ${Label} {
      font-size: ${({ size }) =>
        size === 'sm' ? 10 : size === 'md' ? 12 : 14}px;
    }
  }

  > svg {
    width: ${({ size }) => (size === 'sm' ? 20 : size === 'md' ? 25 : 30)}px;
    height: ${({ size }) => (size === 'sm' ? 20 : size === 'md' ? 25 : 30)}px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: ${({ size }) => (size === 'sm' ? 14 : size === 'md' ? 17 : 20)}px;
      height: ${({ size }) => (size === 'sm' ? 14 : size === 'md' ? 17 : 20)}px;
    }
  }
`;
