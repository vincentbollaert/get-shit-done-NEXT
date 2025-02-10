import { PathParams, http } from 'msw';
import { ClientModel, Requests } from '~/api/types';
import { computeTestingUrl } from '../constants';

const mockUser: ClientModel['User'] = {
  email: 'test@example.com',
  userId: 'test-user-1',
};

const postTask = () =>
  http.post<PathParams, Requests['AddTask']>(computeTestingUrl('/api/v1/tasks'), async ({ request }) => {
    const body = await request.json();
    return Response.json(
      {
        ...body,
        taskId: `task-${Date.now()}`,
        userId: mockUser.userId,
      },
      { status: 200 }
    );
  });

export const postTaskHandlers = {
  defaultHandler: postTask(),
};
