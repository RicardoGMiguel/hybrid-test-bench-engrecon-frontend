/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type LinkWrapperProps = {
  children: React.ReactNode;
  asLink: boolean;
  to?: string;
} & LinkProps;

const LinkWrapper: React.FC<LinkWrapperProps> = ({
  children,
  asLink,
  ...rest
}) => (asLink ? <Link {...rest}>{children}</Link> : <>{children}</>);

export default LinkWrapper;
