import { PathParams, http } from 'msw';
import { Requests } from '~/api/types';
import { computeTestingUrl } from '../constants';

const postCategory = () =>
  http.post<PathParams, Requests['AddCategory']>(computeTestingUrl('/api/v1/categories'), async ({ request }) => {
    const body = await request.json();
    return Response.json(
      {
        ...body,
      },
      { status: 200 }
    );
  });

export const postCategoryHandlers = {
  defaultHandler: postCategory(),
};
