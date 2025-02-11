import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '~/Application/Root/store';
import Layout from '~/components/Layout';
import { useMswInit } from '~/shared/hooks/useMswInit';
import '../styles/critical.scss';
import '../styles/utility-classes.scss';

import Head from 'next/head';

export default function ApplicationRoot({ Component, pageProps }: AppProps) {
  const mswStatus = useMswInit();

  if (mswStatus === 'initializing') {
    return <div>Initializing app locally</div>;
  }

  return (
    <Provider store={store}>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
