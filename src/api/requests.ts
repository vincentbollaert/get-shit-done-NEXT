import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { actions } from '../reducers/calendar';
import { actions as toastActions } from '../reducers/toast';
import { taskSort } from '../shared/utils';
import { ClientModel, Requests, TasksByDay, ValueOf } from './types';

const IS_DEV = process.env.NODE_ENV === 'development';
const URL = IS_DEV ? '/api/v1' : '/api/v1';

export const TASKS_PATH = '/tasks';
export const getTaskPath = (id: string) => `${TASKS_PATH}/${id}`;

export const CATEGORIES_PATH = '/categories';
export const getCategoryPath = (id: string) => `${CATEGORIES_PATH}/${id}`;

export const TODOS_PATH = '/todos';
export const getTodoPath = (id: string) => `${TODOS_PATH}/${id}`;

export const SETTINGS_PATH = '/settings';

const queryFn = ({ url, method, body }: FetchArgs): FetchArgs => ({
  url,
  method,
  body,
  headers: [['withCredentials', 'true']], // withCredentials required for CORS cookies
  credentials: 'include',
});

const findTask = (tasks: ClientModel['Task'][], taskId: string) => tasks.find((task) => task.taskId === taskId);

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Task', 'Todo', 'Category', 'Settings', 'CurrentUser'],
  endpoints: (builder) => ({
    // user
    getCurrentUser: builder.query<ClientModel['User'], void>({
      query: () => queryFn({ url: '/user/current-user' }),
      providesTags: ['CurrentUser'],
    }),
    signin: builder.mutation<ClientModel['User'], Requests['SignIn']>({
      query: (requestParams) => queryFn({ url: '/user/signin', method: 'POST', body: requestParams }),
      invalidatesTags: ['Task', 'Todo', 'Category', 'CurrentUser'],
    }),
    signup: builder.mutation<ClientModel['User'], Requests['SignUp']>({
      query: (requestParams) => queryFn({ url: '/user/signup', method: 'POST', body: requestParams }),
    }),
    signout: builder.mutation<ClientModel['User'], Requests['SignOut']>({
      query: (requestParams) => queryFn({ url: '/user/signout', method: 'POST', body: requestParams }),
      invalidatesTags: ['CurrentUser'],
    }),

    // tasks
    // TODO: update query params to be object or union or something
    // TODO: save current month and year and pass as params to getTasks
    // TODO: add proper error handling for all
    getTasks: builder.query<TasksByDay, void>({
      query: (monthOfTasks) => {
        const date = new Date();
        const monthString = date.toLocaleString('default', { month: 'short' });

        return queryFn({ url: `${TASKS_PATH}?month=${monthString}` });
      },
      providesTags: ['Task'],
    }),
    addTask: builder.mutation<ClientModel['Task'], Requests['AddTask']>({
      query: (payload) => queryFn({ url: TASKS_PATH, body: payload, method: 'POST' }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const affectedDay = draft[payload.timestamp] || { tasks: [] };
            // TODO: find a better way of doing this
            affectedDay.tasks.push({ ...payload, taskId: 'unsaved task' });
            affectedDay.tasks.sort(taskSort);
            draft[payload.timestamp] = affectedDay;
          }),
        );
        dispatch({ type: actions.removePreparedTask.toString() });
        try {
          const response = await queryFulfilled;
          dispatch(
            tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
              findTask(draft[payload.timestamp].tasks, 'unsaved task')!.taskId = response.data.taskId;
            }),
          );
        } catch {
          postResult.undo();
        }
      },
    }),
    saveTask: builder.mutation<ClientModel['Task'], Requests['SaveTask']>({
      query: (requestParams) =>
        queryFn({ url: getTaskPath(requestParams.taskId), method: 'PATCH', body: requestParams }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const { taskId, timestamp } = requestParams;
            const task = findTask(draft[timestamp].tasks, taskId) as Record<
              keyof Requests['SaveTask'],
              ValueOf<Requests['SaveTask']>
            >;
            for (const x in task) {
              const key = x as keyof ClientModel['Task'];
              task[key] = requestParams[key];
            }
          }),
        );
        dispatch({ type: actions.removeEditedTask.toString() });
      },
    }),
    removeTask: builder.mutation<ClientModel['Task'], Requests['RemoveTask']>({
      query: (requestParams) => queryFn({ url: getTaskPath(requestParams.taskId), method: 'DELETE' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const { taskId, timestamp } = requestParams;
            draft[timestamp].tasks = draft[timestamp].tasks.filter((task) => task.taskId !== taskId);
          }),
        );
        dispatch({ type: actions.removeEditedTask.toString() });
      },
    }),

    // categories
    getCategories: builder.query<ClientModel['Category'][], void>({
      query: () => queryFn({ url: CATEGORIES_PATH }),
      providesTags: ['Category'],
    }),
    updateCategory: builder.mutation<ClientModel['Category'], Requests['UpdateCategory']>({
      query: ({ categoryId, colorId }) =>
        queryFn({
          url: getCategoryPath(categoryId),
          body: { colorId },
          method: 'PATCH',
        }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getCategories', undefined, (draft) => {
            const categoryToUpdate = draft.find((category) => category.categoryId === requestParams.categoryId)!;
            categoryToUpdate.colorId = requestParams.colorId;
          }),
        );
      },
    }),
    addCategory: builder.mutation<ClientModel['Category'], Requests['AddCategory']>({
      query: (requestParams) => queryFn({ url: CATEGORIES_PATH, body: requestParams, method: 'POST' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getCategories', undefined, (draft) => {
            draft.push({ ...requestParams, categoryId: 'temp id' }); // TODO: is this the best way?
          }),
        );
      },
    }),
    removeCategory: builder.mutation<ClientModel['Category'], Requests['RemoveCategory']>({
      query: (categoryId) => queryFn({ url: getCategoryPath(categoryId), method: 'DELETE' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getCategories', undefined, (draft) => {
            return draft.filter((category) => category.categoryId !== requestParams);
          }),
        );
      },
    }),

    // settings
    getSettings: builder.query<ClientModel['Settings'], void>({
      query: () => queryFn({ url: SETTINGS_PATH }),
      providesTags: ['Settings'],
    }),
    updateSettings: builder.mutation<ClientModel['Settings'], Requests['UpdateSettings']>({
      query: (body) => queryFn({ url: SETTINGS_PATH, body, method: 'PATCH' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getSettings', undefined, (draft) => {
            console.log('update settings');
            Object.entries(requestParams).forEach(([key, value]) => {
              const draftRecord: Record<keyof Requests['UpdateSettings'], ValueOf<Requests['UpdateSettings']>> = draft;
              draftRecord[key as keyof Requests['UpdateSettings']] = value;
            });
          }),
        );
      },
    }),

    // todos
    getTodos: builder.query<ClientModel['Todo'][], void>({
      query: () => queryFn({ url: TODOS_PATH }),
      providesTags: ['Todo'],
    }),
    updateTodo: builder.mutation<ClientModel['Todo'], Requests['UpdateTodo']>({
      query: ({ todoId, isDone }) =>
        queryFn({
          url: getTodoPath(todoId),
          body: { todoId, isDone },
          method: 'PATCH',
        }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todoToUpdate = draft.find((todo) => todo.todoId === requestParams.todoId)!;
            todoToUpdate.isDone = !!requestParams.isDone;
          }),
        );
      },
    }),
    removeTodo: builder.mutation<ClientModel['Todo'], Requests['RemoveTodo']>({
      async queryFn(todoId, queryApi, extraOptions, baseQuery) {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(baseQuery(queryFn({ url: getTodoPath(todoId), method: 'DELETE' })));
          }, 5000);
        });
        // TODO: Add error handling
        // TODO: remove this data nesting
        return response as { data: ClientModel['Todo'] };
      },
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getTodos', undefined, (draft) => {
            return draft.filter((todo) => todo.todoId !== requestParams);
          }),
        );
        dispatch(toastActions.addToast({ prefix: 'todo removed', message: 'remove this todo' }));
      },
    }),
    addTodo: builder.mutation<ClientModel['Todo'], Requests['AddTodo']>({
      query: (requestParams) => queryFn({ url: TODOS_PATH, body: requestParams, method: 'POST' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getTodos', undefined, (draft) => {
            draft.unshift({ ...requestParams, todoId: 'temp id' }); // TODO: is this the best way?
          }),
        );
        dispatch(toastActions.addToast({ prefix: 'todo added', message: 'sdsds' }));
      },
    }),
  }),
});

export const {
  // user
  useGetCurrentUserQuery,
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,

  // tasks
  useGetTasksQuery,
  useAddTaskMutation,
  useSaveTaskMutation,
  useRemoveTaskMutation,

  // categories
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,

  // settings
  useGetSettingsQuery,
  useUpdateSettingsMutation,

  // todos
  useGetTodosQuery,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
  useAddTodoMutation,
} = tasksApi;
