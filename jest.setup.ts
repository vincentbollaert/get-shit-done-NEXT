import '@testing-library/jest-dom';
import { store } from './src/Application/Root/store';
import { server } from './src/mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  store.dispatch({ type: 'RESET_STATE' });
  // store.dispatch(tasksApi.util.resetApiState());
});

afterAll(() => server.close());
