import { http } from 'msw';
import { ClientModel } from '~/api/types';
import { computeTestingUrl } from '../constants';

const mockUser: ClientModel['User'] = {
  email: 'test@example.com',
  userId: 'test-user-1',
};

const getUser = () =>
  http.get(computeTestingUrl('/api/v1/user/current-user'), async () => {
    return Response.json(mockUser, { status: 200 });
  });

const getUserEmpty = () =>
  http.get(computeTestingUrl('/api/v1/user/current-user'), async () => {
    return Response.json(undefined, { status: 200 });
  });

export const getUserHandlers = {
  defaultHandler: getUser(),
  empty: getUserEmpty(),
};
