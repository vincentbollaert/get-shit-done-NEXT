import { PathParams, http } from 'msw';
import { ClientModel, Requests } from '~/api/types';
import { computeTestingUrl } from '../constants';
import { setIsLoggedIn } from './getUser';

const mockUser: ClientModel['User'] = {
  email: 'test@example.com',
  userId: 'test-user-1',
};

const postUser = () =>
  http.post<PathParams, Requests['SignIn']>(computeTestingUrl('/api/v1/user/signin'), async ({ request }) => {
    const { email, password } = await request.json();

    if (email === mockUser.email && password === 'password') {
      setIsLoggedIn(true);
      
      return Response.json(mockUser, {
        status: 200,
      });
    }

    return Response.json({ errorMessage: 'invalid credentials' }, { status: 500 });
  });

export const postUserHandlers = {
  defaultHandler: postUser(),
};
