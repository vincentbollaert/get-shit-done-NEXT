import { PathParams, http } from 'msw';
import { ClientModel, Requests } from '~/api/types';
import { computeTestingUrl } from '../constants';

const mockUser: ClientModel['User'] = {
  email: 'test@example.com',
  userId: 'test-user-1',
};

const postUser = () =>
  http.post<PathParams, Requests['SignIn']>(computeTestingUrl('/api/v1/user/signin'), async () => {
    return Response.json(mockUser, { status: 200 });
  });

export const postUserHandlers = {
  defaultHandler: postUser(),
};
