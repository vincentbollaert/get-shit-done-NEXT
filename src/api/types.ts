import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { NextApiRequest } from 'next';

export type Models = {
  Category: {
    name: string;
    colorId: string;
    userId: string;
  };
  Settings: {
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
  Task: {
    timestamp: string;
    name: string;
    category: string;
    time: number[];
    userId: string;
  };
  Todo: {
    todoName: string;
    isDone?: boolean;
    userId: string;
  };
  User: {
    email: string;
    password: string;
  };
};

// models
// TODO: update these responses
export type TasksByDay = {
  [key: string]: {
    tasks: ClientModel['Task'][];
  };
};

// type TaskUnsaved = Models['Task'] & { taskId?: string };

export type ClientModel = {
  Task: Models['Task'] & { taskId: string };
  Category: Models['Category'] & { categoryId: string };
  Todo: Models['Todo'] & { todoId: string };
  User: Omit<Models['User'], 'password'> & { userId: string };
  Settings: Models['Settings'];
};

export type Requests = {
  GetTasks: string; // monthOfTasks
  AddTask: Models['Task'];
  SaveTask: Partial<ClientModel['Task']> & Pick<ClientModel['Task'], 'taskId' | 'timestamp'>;
  RemoveTask: Partial<ClientModel['Task']> & Pick<ClientModel['Task'], 'taskId' | 'timestamp'>;
  AddCategory: Models['Category'];
  UpdateCategory: Partial<ClientModel['Category']> & Pick<ClientModel['Category'], 'categoryId' | 'colorId'>;
  RemoveCategory: string; // categoryId
  UpdateSettings: Partial<ClientModel['Settings']>;
  AddTodo: Omit<Models['Todo'], 'isDone'>;
  UpdateTodo: Partial<ClientModel['Todo']> & Pick<ClientModel['Todo'], 'todoId'>;
  RemoveTodo: string; // todoId
  SignUp: Models['User'];
  SignIn: Models['User'];
  SignOut: unknown;
};

// next api
export type NextApiRequestWithUser = NextApiRequest & { loggedInUser?: ClientModel['User'] };

export type RTKQueryStatus = {
  isUninitialized: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error?: FetchBaseQueryError | SerializedError;
  originalArgs?: any;
};
