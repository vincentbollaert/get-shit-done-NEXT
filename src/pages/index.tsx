import type { NextPage } from 'next';
import Head from 'next/head';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useGetSettingsQuery } from '~/api/requests';
import { Settings } from '~/api/types';
import { themes } from '~/shared/themes';
import Home from '../Home/Home';
import { reset } from '../styles';

const GlobalStyle = createGlobalStyle<{ activeSizeTheme: Settings['size'] }>`
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

const IndexPage: NextPage = () => {
  const { data } = useGetSettingsQuery();
  const activeColorThemeValues = themes[data?.theme || 'light'];
  const activeSizeTheme = data?.size || 'normal';

  return (
    <div>
      <Head>
        <title>Test homepage</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <GlobalStyle activeSizeTheme={activeSizeTheme} />
      <ThemeProvider theme={activeColorThemeValues}>
        <PageWrap>
          <Home />
        </PageWrap>
      </ThemeProvider>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default IndexPage;
