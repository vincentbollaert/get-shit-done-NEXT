import Head from 'next/head';
import { ReactNode } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useGetSettingsQuery } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { themes } from '~/shared/themes';
import { reset } from '../styles';

const GlobalStyle = createGlobalStyle<{ activeSizeTheme: ClientModel['Settings']['size'] }>`
  html {
    font-size: ${(p) => (p.activeSizeTheme === 'normal' ? '62.5%' : p.activeSizeTheme === 'breath' ? '50%' : '75%')};
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
// eslint-disable-next-line import/no-default-export
export default function Layout({ children, title = 'This is the default title' }: Props) {
  const { data } = useGetSettingsQuery();
  const activeColorThemeValues = themes[data?.theme || 'light'];
  const activeSizeTheme = data?.size || 'normal';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" name="viewport" content="width=device-width" />
      </Head>
      <GlobalStyle activeSizeTheme={activeSizeTheme} />
      <ThemeProvider theme={activeColorThemeValues}>
        <PageWrap>{children}</PageWrap>
      </ThemeProvider>
    </>
  );
}
