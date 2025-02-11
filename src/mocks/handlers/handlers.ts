import { getUserHandlers } from './user/getUser';
import { postUserHandlers } from './user/postUser';

import { getSettingsHandlers } from './settings/getSettings';
import { patchSettingsHandlers } from './settings/patchSettings';

import { getCategoriesHandlers } from './categories/getCategories';
import { patchCategoryHandlers } from './categories/patchCategory';
import { postCategoryHandlers } from './categories/postCategory';

import { deleteTaskHandlers } from './tasks/deleteTask';
import { getTasksHandlers } from './tasks/getTasks';
import { patchTaskHandlers } from './tasks/patchTask';
import { postTaskHandlers } from './tasks/postTask';

export const handlers = [
  getUserHandlers.defaultHandler,
  postUserHandlers.defaultHandler,

  getSettingsHandlers.defaultHandler,
  patchSettingsHandlers.defaultHandler,

  getCategoriesHandlers.defaultHandler,
  patchCategoryHandlers.defaultHandler,
  postCategoryHandlers.defaultHandler,

  getTasksHandlers.defaultHandler,
  patchTaskHandlers.defaultHandler,
  postTaskHandlers.defaultHandler,
  deleteTaskHandlers.defaultHandler,
];
