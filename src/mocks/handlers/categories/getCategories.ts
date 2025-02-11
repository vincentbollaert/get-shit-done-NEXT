import { http } from 'msw';
import { ClientModel } from '~/api/types';
import { computeTestingUrl } from '../constants';

const mockCategories: ClientModel['Category'][] = [
  {
    categoryId: 'life admin',
    name: 'Life admin',
    colorId: 'plumWeb',
    userId: 'test-user-1',
  },
  {
    categoryId: 'relax',
    name: 'Relax',
    colorId: 'middleBlueGreen',
    userId: 'test-user-1',
  },
  {
    categoryId: 'work',
    name: 'Work',
    colorId: 'middleBlueGreen',
    userId: 'test-user-1',
  },
  {
    categoryId: 'productive',
    name: 'Productive',
    colorId: 'middleBlueGreen',
    userId: 'test-user-1',
  },
  {
    categoryId: 'laze',
    name: 'Laze',
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
