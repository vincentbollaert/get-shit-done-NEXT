// https://webpack.js.org/guides/typescript/

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

import 'styled-components';
import type { ThemeValues } from './shared/themes';

declare module 'styled-components' {
  export type DefaultTheme = ThemeValues;
}
