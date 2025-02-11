import { PathParams, http } from 'msw';
import { Requests } from '~/api/types';
import { getCategoryPath } from '../../../api/requests';
import { computeTestingUrl } from '../constants';

const patchCategory = () =>
  http.patch<PathParams, Requests['UpdateCategory']>(
    computeTestingUrl('/api/v1' + getCategoryPath(':categoryId')),
    async ({ request }) => {
      const body = await request.json();
      return Response.json(
        {
          ...body,
        },
        { status: 200 }
      );
    }
  );

export const patchCategoryHandlers = {
  defaultHandler: patchCategory(),
};
