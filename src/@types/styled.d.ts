import 'styled-components';
import themeDefaults from '../style/themeDefaults';

declare module 'styled-components' {
  type OurThemeType = typeof themeDefaults;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends OurThemeType {}
}
