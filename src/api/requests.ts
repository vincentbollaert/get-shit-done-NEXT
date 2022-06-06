import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ValueOf } from '../Home/Calendar/EditCalendarTask/EditCalendarTask';
import { actions } from '../reducers/calendar';
import { actions as toastActions } from '../reducers/toast';
import { taskSort } from '../shared/utils';
import {
  AddGroupRequest,
  AddGroupResponse,
  AddTaskRequest,
  AddTaskResponse,
  AddTodoRequest,
  AddTodoResponse,
  GetCurrentUserResponse,
  GetGroupsResponse,
  GetSettingsResponse,
  GetTasksResponse,
  GetTodosResponse,
  RemoveGroupRequest,
  RemoveGroupResponse,
  RemoveTaskRequest,
  RemoveTaskResponse,
  RemoveTodoRequest,
  RemoveTodoResponse,
  SaveTaskRequest,
  SaveTaskResponse,
  SignInRequest,
  SignInResponse,
  SignOutRequest,
  SignOutResponse,
  SignUpRequest,
  SignUpResponse,
  Task,
  UpdateGroupRequest,
  UpdateGroupResponse,
  UpdateSettingsRequest,
  UpdateSettingsResponse,
  UpdateTodoRequest,
  UpdateTodoResponse,
} from './types';

const IS_DEV = process.env.NODE_ENV === 'development';
const URL = IS_DEV ? '/api/v1' : 'https://get-shit-done-api.herokuapp.com/api/v1';

export const TASKS_PATH = '/tasks';
export const getTaskPath = (id: string) => `${TASKS_PATH}/${id}`;

export const GROUPS_PATH = '/groups';
export const getGroupPath = (id: string) => `${GROUPS_PATH}/${id}`;

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

const findTask = (tasks: Task[], taskId: string) => tasks.find((task) => task.taskId === taskId);

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Task', 'Todo', 'Group', 'Settings', 'CurrentUser'],
  endpoints: (builder) => ({
    // user
    getCurrentUser: builder.query<GetCurrentUserResponse['data'], void>({
      query: () => queryFn({ url: '/user/current-user' }),
      transformResponse: (payload: GetCurrentUserResponse) => payload.data,
      providesTags: ['CurrentUser'],
    }),
    signin: builder.mutation<SignInResponse['data'], SignInRequest>({
      query: (requestParams) => queryFn({ url: '/user/signin', method: 'POST', body: requestParams }),
      transformResponse: (payload: SignInResponse) => payload.data,
      invalidatesTags: ['Task', 'Todo', 'Group', 'CurrentUser'],
    }),
    signup: builder.mutation<SignUpResponse['data'], SignUpRequest>({
      query: (requestParams) => queryFn({ url: '/user/signup', method: 'POST', body: requestParams }),
      transformResponse: (payload: SignUpResponse) => payload.data,
    }),
    signout: builder.mutation<SignOutResponse['data'], SignOutRequest>({
      query: (requestParams) => queryFn({ url: '/user/signout', method: 'POST', body: requestParams }),
      transformResponse: (payload: SignOutResponse) => payload.data,
      invalidatesTags: ['CurrentUser'],
    }),

    // tasks
    // TODO: update query params to be object or union or something
    // TODO: save current month and year and pass as params to getTasks
    // TODO: add proper error handling for all
    getTasks: builder.query<GetTasksResponse['data'], void>({
      query: (monthOfTasks) => queryFn({ url: `${TASKS_PATH}?month=Jun` }),
      transformResponse: (payload: GetTasksResponse) => payload.data,
      providesTags: ['Task'],
    }),
    addTask: builder.mutation<AddTaskResponse, AddTaskRequest>({
      query: (payload) => queryFn({ url: TASKS_PATH, body: payload, method: 'POST' }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const affectedDay = draft[payload.timestamp] || { tasks: [] };
            // TODO: find a better way of doing this
            affectedDay.tasks.push({ ...payload, taskId: 'unsaved task' });
            affectedDay.tasks.sort(taskSort);
            draft[payload.timestamp] = affectedDay;
          })
        );
        dispatch({ type: actions.removePreparedTask.toString() });
        try {
          const response = await queryFulfilled;
          dispatch(
            tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
              findTask(draft[payload.timestamp].tasks, 'unsaved task')!.taskId = response.data.data.taskId;
            })
          );
        } catch {
          postResult.undo();
        }
      },
    }),
    saveTask: builder.mutation<SaveTaskResponse, SaveTaskRequest>({
      query: (requestParams) =>
        queryFn({ url: getTaskPath(requestParams.taskId), method: 'PATCH', body: requestParams }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const { taskId, timestamp } = requestParams;
            const task = findTask(draft[timestamp].tasks, taskId) as Record<
              keyof SaveTaskRequest,
              ValueOf<SaveTaskRequest>
            >;
            for (const x in task) {
              const key = x as keyof Task;
              task[key] = requestParams[key];
            }
          })
        );
        dispatch({ type: actions.removeEditedTask.toString() });
      },
    }),
    removeTask: builder.mutation<RemoveTaskResponse, RemoveTaskRequest>({
      query: (requestParams) => queryFn({ url: getTaskPath(requestParams.taskId), method: 'DELETE' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const { taskId, timestamp } = requestParams;
            draft[timestamp].tasks = draft[timestamp].tasks.filter((task) => task.taskId !== taskId);
          })
        );
        dispatch({ type: actions.removeEditedTask.toString() });
      },
    }),

    // groups
    getGroups: builder.query<GetGroupsResponse['data'], void>({
      query: () => queryFn({ url: GROUPS_PATH }),
      transformResponse: (payload: GetGroupsResponse) => payload.data,
      providesTags: ['Group'],
    }),
    updateGroup: builder.mutation<UpdateGroupResponse, UpdateGroupRequest>({
      query: ({ groupId, colorId }) =>
        queryFn({
          url: getGroupPath(groupId),
          body: { colorId },
          method: 'PATCH',
        }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getGroups', undefined, (draft) => {
            const groupToUpdate = draft.find((group) => group.groupId === requestParams.groupId)!;
            groupToUpdate.colorId = requestParams.colorId;
          })
        );
      },
    }),
    addGroup: builder.mutation<AddGroupResponse, AddGroupRequest>({
      query: (requestParams) => queryFn({ url: GROUPS_PATH, body: requestParams, method: 'POST' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        // dispatch(
        //   tasksApi.util.updateQueryData('getGroups', undefined, (draft) => {
        //     draft.unshift({ ...requestParams, todoId: 'temp id' }); // TODO: is this the best way?
        //   })
        // );
        dispatch(toastActions.addToast({ prefix: 'group added', message: 'sdsds' }));
      },
    }),
    removeGroup: builder.mutation<RemoveGroupResponse, RemoveGroupRequest>({
      query: (groupId) => queryFn({ url: getGroupPath(groupId), method: 'DELETE' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getGroups', undefined, (draft) => {
            return draft.filter((group) => group.groupId !== requestParams);
          })
        );
      },
    }),

    // settings
    getSettings: builder.query<GetSettingsResponse['data'], void>({
      query: () => queryFn({ url: SETTINGS_PATH }),
      transformResponse: (payload: GetSettingsResponse) => payload.data,
      providesTags: ['Settings'],
    }),
    updateSettings: builder.mutation<UpdateSettingsResponse, UpdateSettingsRequest>({
      query: (body) => queryFn({ url: SETTINGS_PATH, body, method: 'PATCH' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getSettings', undefined, (draft) => {
            console.log('update settings');
            Object.entries(requestParams).forEach(([key, value]) => {
              const draftRecord: Record<keyof UpdateSettingsRequest, ValueOf<UpdateSettingsRequest>> = draft;
              draftRecord[key as keyof UpdateSettingsRequest] = value;
            });
          })
        );
      },
    }),

    // todos
    getTodos: builder.query<GetTodosResponse['data'], void>({
      query: () => queryFn({ url: TODOS_PATH }),
      transformResponse: (payload: GetTodosResponse) => payload.data,
      providesTags: ['Todo'],
    }),
    updateTodo: builder.mutation<UpdateTodoResponse, UpdateTodoRequest>({
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
          })
        );
      },
    }),
    removeTodo: builder.mutation<RemoveTodoResponse, RemoveTodoRequest>({
      async queryFn(todoId, queryApi, extraOptions, baseQuery) {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(baseQuery(queryFn({ url: getTodoPath(todoId), method: 'DELETE' })));
          }, 5000);
        });
        // TODO: Add error handling
        // TODO: remove this data nesting
        return response as { data: RemoveTodoResponse };
      },
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getTodos', undefined, (draft) => {
            return draft.filter((todo) => todo.todoId !== requestParams);
          })
        );
        dispatch(toastActions.addToast({ prefix: 'todo removed', message: 'remove this todo' }));
      },
    }),
    addTodo: builder.mutation<AddTodoResponse, AddTodoRequest>({
      query: (requestParams) => queryFn({ url: TODOS_PATH, body: requestParams, method: 'POST' }),
      onQueryStarted: (requestParams, { dispatch }) => {
        dispatch(
          tasksApi.util.updateQueryData('getTodos', undefined, (draft) => {
            draft.unshift({ ...requestParams, todoId: 'temp id' }); // TODO: is this the best way?
          })
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

  // groups
  useGetGroupsQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useRemoveGroupMutation,

  // settings
  useGetSettingsQuery,
  useUpdateSettingsMutation,

  // todos
  useGetTodosQuery,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
  useAddTodoMutation,
} = tasksApi;
