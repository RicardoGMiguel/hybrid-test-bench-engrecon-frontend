import { Spinner } from '@chakra-ui/react';
import React, { ButtonHTMLAttributes } from 'react';

import themeDefaults from '@style/themeDefaults';
import { IconType } from 'react-icons';
import LinkWrapper from './LinkWrapper';
import { Container, Label } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  outlined?: boolean;
  alt?: boolean;
  disabled?: boolean;
  loading?: boolean;
  asLink?: boolean;
  to?: string;
  Icon?: IconType;
  iconRight?: boolean;
  borderRadius?: number;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<IButtonProps> = ({
  label,
  outlined = false,
  alt = false,
  disabled = false,
  loading = false,
  asLink = false,
  size = 'md',
  to,
  borderRadius,
  Icon,
  iconRight,
  backgroundColor,
  borderColor,
  color,
  ...rest
}) => (
  <LinkWrapper asLink={asLink} to={to || ''}>
    <Container
      type="submit"
      {...rest}
      $outlined={outlined}
      $alt={alt}
      disabled={disabled}
      $loading={loading}
      size={size}
      borderRadius={borderRadius || 10}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {loading ? (
        <Spinner size="xs" color={themeDefaults.colors.primary} />
      ) : (
        <>
          {Icon && !iconRight && (
            <Icon color={color || themeDefaults.colors.white} />
          )}
          <Label labelColor={color}>{label}</Label>
          {Icon && iconRight && (
            <Icon color={color || themeDefaults.colors.white} />
          )}
        </>
      )}
    </Container>
  </LinkWrapper>
);

export default Button;
