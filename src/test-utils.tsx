import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './Application/Root/store';

const customRender = (ui: React.ReactElement, options = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
