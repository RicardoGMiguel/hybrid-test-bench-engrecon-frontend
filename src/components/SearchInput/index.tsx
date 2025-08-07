import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const SearchInput: React.FC<InputProps> = ({ placeholder, ...rest }) => (
  <Container {...rest} name="search" placeholder={placeholder} />
);

export default SearchInput;
