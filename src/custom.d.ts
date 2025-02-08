 
// https://webpack.js.org/guides/typescript/

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: any;
  export default content;
}

import 'styled-components';
import type { ThemeValues } from './shared/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeValues {}
}
