import type { ClientModel } from '~/api/types';

type ThemeValues = {
  bg: string;
  columnBorder: string;
  columnHoverBg: string;
  placeholderBorder: string;
  axisBg: string;
  axisBorder: string;
  currentTimeBg: string;
  currentTimeBorder: string;
  currentTimeColor: string;
};

export const themes: Record<ClientModel['Settings']['theme'], ThemeValues> = {
  light: {
    bg: '#fff',
    columnBorder: 'var(--isabelline)',
    columnHoverBg: '#fefcff',
    placeholderBorder: '#3d4150',
    axisBg: 'var(--jet)',
    axisBorder: '#ffffff42',
    currentTimeBg: 'var(--jet)',
    currentTimeBorder: 'var(--jet)',
    currentTimeColor: 'var(--white-smoke)',
  },
  dark: {
    bg: '#2a2a2a',
    columnBorder: '#3c3b3b',
    columnHoverBg: '#333',
    placeholderBorder: '#fff',
    axisBg: '#222',
    axisBorder: '#3c3b3b',
    currentTimeBg: '#fff',
    currentTimeBorder: '#222',
    currentTimeColor: '#222',
  },
  'high contrast': {
    bg: '#2a2a2a',
    columnBorder: '#3c3b3b',
    columnHoverBg: '#333',
    placeholderBorder: '#fff',
    axisBg: '#222',
    axisBorder: '#3c3b3b',
    currentTimeBg: '#fff',
    currentTimeBorder: '#222',
    currentTimeColor: '#222',
  },
};
