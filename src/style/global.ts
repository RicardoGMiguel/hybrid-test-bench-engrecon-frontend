import { createGlobalStyle } from 'styled-components';
import themeDefaults from './themeDefaults';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    outline:0;
  }

  body {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility !important;

    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  h1,h2,h3,h4,strong{
    font-weight: 500;
  }

  a{
    text-decoration:none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
  }

  @media (max-width: ${themeDefaults.breakpoints.xl}) {
    body, input, button {
      font-size: 14px;
    }
  }

  @media (max-width: ${themeDefaults.breakpoints.lg}) {
    body, input, button {
      font-size: 12px;
    }
  }
`;
