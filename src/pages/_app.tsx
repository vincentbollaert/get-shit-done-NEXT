import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '~/Application/Root/store';
import '../styles/utility-classes.scss';

// eslint-disable-next-line import/no-default-export
export default function ApplicationRoot({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
