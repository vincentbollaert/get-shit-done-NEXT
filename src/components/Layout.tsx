import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useGetSettingsQuery } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { useAppDispatch } from '~/Application/Root';
import { actions } from '~/reducers/calendar';
import { themes } from '~/shared/themes';
import { reset } from '../styles';

import { Barlow_Semi_Condensed } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const barlowFont = Barlow_Semi_Condensed({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

const GlobalStyle = createGlobalStyle<{ $activeSizeTheme: ClientModel['Settings']['size'] }>`
  html {
    font-size: ${(p) => (p.$activeSizeTheme === 'normal' ? '62.5%' : p.$activeSizeTheme === 'breath' ? '50%' : '75%')};
  }
  ${reset};
`;

const PageWrap = styled.div`
  display: grid;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
`;

// TODO: refer to https://github.com/kachkaev/njt for critical css and js and where to put themeprovider

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ children, title = 'This is the default title' }: Props) {
  const dispatch = useAppDispatch();
  const { data } = useGetSettingsQuery();
  useEffect(() => {
    if (!data?.daysToShow) return;
    dispatch(actions.setDays({ period: data.daysToShow }));
  }, [data?.daysToShow]);

  const activeColorThemeValues = themes[data?.theme || 'light'];
  const activeSizeTheme = data?.size || 'normal';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" name="viewport" content="width=device-width" />
      </Head>
      <GlobalStyle $activeSizeTheme={activeSizeTheme} />
      <ThemeProvider theme={activeColorThemeValues}>
        <PageWrap className={barlowFont.className}>{children}</PageWrap>
      </ThemeProvider>
    </>
  );
}
