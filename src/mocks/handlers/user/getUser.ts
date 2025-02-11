import { http } from 'msw';
import { ClientModel } from '~/api/types';
import { computeTestingUrl } from '../constants';

const mockUser: ClientModel['User'] = {
  email: 'test@example.com',
  userId: 'test-user-1',
};

let isLoggedIn = true;

export const setIsLoggedIn = (shouldLogIn: boolean) => {
  isLoggedIn = shouldLogIn;
};

const getUser = () =>
  http.get(computeTestingUrl('/api/v1/user/current-user'), async () => {
    console.log('get current user');
    return Response.json(isLoggedIn ? mockUser : undefined, { status: 200 });
  });

export const getUserHandlers = {
  defaultHandler: getUser(),
};
