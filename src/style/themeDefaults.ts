import { keyframes } from 'styled-components';

const themeDefaults = {
  colors: {
    exyGray: '#3E4C59',
    exyGrayHover: '#163a5c',
    exyGrayListBackground: '#556879',

    exyGreen: '#C6C6A5',

    orange: '#FC8744',
    hoverOrange: '#ff7424',

    lightGray: '#EEEEEE',
    mediumGray: '#B9B9B9',
    darkGray: '#373435',

    disableOrange: '#d5733a',

    modalBackground: '#00000099',

    gaugeFirstColor: '#4FEC5A',
    gaugeSecondColor: '#C8FF2B',
    gaugeThirdColor: '#F2D32C',
    gaugeFourthColor: '#FC8744',
    gaugeFifthColor: '#FF2B2B',

    greenButtonColor: '#4FBD1B',
    yellowButtonColor: '#FFC700',
    redButtonColor: '#FF3535',

    primary: '#d303fc',
    secondary: '#8878ff',

    black: '#000000',
    white: '#FFFFFF',
    warmGray: '#DED7D6',
    warmGrayBackground: '#F2EFEF',
    warmGrayMinus1: '#A7A1A1',
    warmGrayMinus2: '#968282',
    warmGrayMinus3: '#4D3938',

    softBlue: '#BDCDDA',
    softBlueBackground: '#EFF3F6',
    softBluePlus1: '#DDE7ED',
    softBlueMinus1: '#56729F',
    softBlueMinus2: '#343B55',

    sageGreen: '#BFCFBE',
    sageGreenBackground: '#F6F8F6',
    sageGreenPlus1: '#E5ECE5',
    sageGreenMinus1: '#53846A',
    sageGreenMinus2: '#1D4941',

    background: '#F2F2F2',
    backgroundPrimary: '#2A9DF4',
    backgroundDisabled: '#F8F8F8',
    backgroundDisabledHighlight: '#0FFFFF',
    backgroundLight: '#FFFFFF',
    backgroundDark: '#6F778230',

    according: '#53846A',
    alert: '#FFA000',
    danger: '#E92020',
    inactive: '#D0D0D0D0',

    loginInputColor: '#393939',
    loginPlaceholderColor: '#9D9D9D',
  },
  shadows: {
    outer: '2px 2px 2px 0px #00000026',
    inner: 'inset 2px 2px 2px 0px #00000026',
  },
  filters: {
    hover: 'brightness(0.95)',
    active: 'brightness(0.6)',
    disabled: 'brightness(1.2)',
    disabledChart: 'grayscale(1)',
  },
  fontFamily: "'Roboto', sans-serif",
  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '64em', // 1024px
    xl: '75em', // 1200px
    '2xl': '90em', // 1440px
    '3xl': '110em', // 1760px
  },
  animations: {
    appearFromBottom: keyframes`
    from {
      opacity: 0;
      transform: translateY(100px)
    }
    to {
      opacity: 1;
      transform: translateY(0)
    }
  `,
    fadeIn: keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `,
    animationTime: {
      time1: 600,
    },
  },
};

export default themeDefaults;
