import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '~/Application/Root/store';
import Layout from '~/components/Layout';
import '../styles/critical.scss';
import '../styles/utility-classes.scss';

// TODO: ask should themeprovider and provider go into app or layout
// TODO: ask what about index.html css for initial load

// eslint-disable-next-line import/no-default-export
export default function ApplicationRoot({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
