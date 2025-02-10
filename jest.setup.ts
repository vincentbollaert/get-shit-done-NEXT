import '@testing-library/jest-dom';
import { server } from './src/mocks/server';

beforeAll(() => {
  server.listen();
});

afterAll(() => server.close());
