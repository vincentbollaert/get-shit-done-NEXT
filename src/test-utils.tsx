import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { tasksApi } from '~/api/requests';
import { reducer as app } from '~/reducers/app';
import { reducer as calendar } from '~/reducers/calendar';
import { reducer as toast } from '~/reducers/toast';


const createTestStore = () => {
  return configureStore({
    reducer: {
      [tasksApi.reducerPath]: tasksApi.reducer,
      app,
      calendar,
      toast
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksApi.middleware),
  });
};

const customRender = (ui: React.ReactElement, options = {}) => {
  const testStore = createTestStore();
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={testStore}>
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
