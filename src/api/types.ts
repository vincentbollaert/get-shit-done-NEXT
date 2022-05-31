import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

// models
// TODO: update these responses
export type TasksByDay = {
  [key: string]: {
    tasks: Task[];
  };
};

export type TaskUnsaved = {
  taskId?: string;
  timestamp: string;
  name: string;
  group: string;
  time: number[];
  userId: string;
};
export type Task = Required<TaskUnsaved>;

export type Group = {
  groupId: string;
  colorId: string;
  name: string;
  userId: string;
};

export type Todo = {
  todoId: string;
  isDone: boolean;
  todoName: string;
  userId: string;
};

export type Settings = {
  theme: 'light' | 'dark' | 'high contrast';
  size: 'compact' | 'normal' | 'breath';
  daysToShow: '1week' | '3weeks' | '1month';
  hoursToShow: number[];
  isHomepage: boolean;
  showGridLines: boolean;
  showHourMarkers: boolean;
  shouldScrollColumns: boolean;
  hideCalendarInactive: boolean;
  hideCalendarStartup: boolean;
  shouldAutoLogout: boolean;
  userId: string;
};

export type User = {
  userId: string;
  email: string;
};

export type RTKQueryStatus = {
  isUninitialized: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error?: FetchBaseQueryError | SerializedError;
  originalArgs?: any;
};

// requests - tasks
export type GetTasksRequest = string; // monthOfTasks
export type GetTasksResponse = { data: TasksByDay };
export type AddTaskRequest = TaskUnsaved;
export type AddTaskResponse = { data: Task };
export type SaveTaskRequest = Partial<Task> & Required<Pick<Task, 'taskId' | 'timestamp'>>;
export type SaveTaskResponse = { data: Task };
export type RemoveTaskRequest = Partial<Task> & Required<Pick<Task, 'taskId' | 'timestamp'>>;
export type RemoveTaskResponse = { data: Task };

// requests - groups
export type GetGroupsResponse = { data: Group[] };
export type AddGroupRequest = Omit<Group, 'groupId'>;
export type AddGroupResponse = { data: Group };
export type UpdateGroupRequest = Partial<Group> & Pick<Group, 'groupId' | 'colorId'>;
export type UpdateGroupResponse = { data: Group };
export type RemoveGroupRequest = string; // goupId;
export type RemoveGroupResponse = { data: Group };

// requests - settings
export type GetSettingsResponse = { data: Settings };
export type UpdateSettingsRequest = Partial<Settings>;
export type UpdateSettingsResponse = { data: Settings };

// requests - todos
export type GetTodosResponse = { data: Todo[] };
export type AddTodoRequest = Omit<Todo, 'todoId'>;
export type AddTodoResponse = { data: Todo };
export type UpdateTodoRequest = Partial<Todo> & Pick<Todo, 'todoId'>;
export type UpdateTodoResponse = { data: Todo };
export type RemoveTodoRequest = string; // todoId
export type RemoveTodoResponse = { data: Todo };

// requests - user
export type GetCurrentUserResponse = { data: User };
export type SignUpRequest = { email: string; password: string };
export type SignUpResponse = { data: User };
export type SignInRequest = { email: string; password: string };
export type SignInResponse = { data: User };

// TODO: find out how to pass nothing to a mutateFn. Atm it just skips it
export type SignOutRequest = unknown;
export type SignOutResponse = { data: User };
