import { Redirect, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useGetSettingsQuery } from '~/api/requests';
import { Settings } from '~/api/types';
// import { SWUpdate } from '~/shared/components';
// import { useServiceWorker } from '~/shared/hooks/useServiceWorker';
import { themes } from '~/shared/themes';
import { Home } from '../pages/Home/Home';
import { reset } from '../styles';
import '../styles/utility-classes.scss';
import { homePath } from './paths';

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

export const Application = () => {
  // const isUpdateAvailable = useServiceWorker(false);
  const { data } = useGetSettingsQuery();
  const activeColorThemeValues = themes[data?.theme || 'light'];
  const activeSizeTheme = data?.size || 'normal';

  return (
    <div>
      <GlobalStyle activeSizeTheme={activeSizeTheme} />
      <ThemeProvider theme={activeColorThemeValues}>
        <PageWrap>
          <Switch>
            <Route exact path={homePath()} component={Home} />
            <Redirect to={homePath()} />
          </Switch>
          {/* <SWUpdate isUpdateAvailable={isUpdateAvailable} /> */}
        </PageWrap>
      </ThemeProvider>
    </div>
  );
};
