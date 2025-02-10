import { http } from 'msw';
import { ClientModel } from '~/api/types';
import { computeTestingUrl } from '../constants';

// const BASE_URL = 'http://localhost';

const mockCategories: ClientModel['Category'][] = [
  {
    categoryId: 'work',
    name: 'Work',
    colorId: 'plumWeb',
    userId: 'test-user-1',
  },
  {
    categoryId: 'personal',
    name: 'Personal',
    colorId: 'middleBlueGreen',
    userId: 'test-user-1',
  },
];

const getCategories = () =>
  http.get(computeTestingUrl('/api/v1/categories'), async () => {
    return Response.json(mockCategories, { status: 200 });
  });

export const getCategoriesHandlers = {
  defaultHandler: getCategories(),
};
