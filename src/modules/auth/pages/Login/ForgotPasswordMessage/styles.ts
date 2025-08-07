import themeDefaults from '@style/themeDefaults';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding: 6rem;

  > img {
    width: 60px;
  }

  > h1 {
    font-size: 1.6rem;
    color: ${themeDefaults.colors.exyGray};
    font-weight: 900;
  }

  > h2 {
    font-size: 1.4rem;
    color: ${themeDefaults.colors.exyGray};
    font-weight: 600;
  }

  > a {
    font-size: 1.4rem;
    color: ${themeDefaults.colors.exyGray};
    font-weight: 600;

    :hover {
      font-weight: 500;
    }
  }
`;
