import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { NextApiRequest } from 'next';
import { components, paths } from './types/schema';

export type ValueOf<T> = T[keyof T];

export type Models = components['schemas'] & {
  Todo: {
    todoName: string;
    isDone?: boolean;
    userId: string;
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

// SIMPLER
export type ClientModel = {
  Task: Models['Task'] & { taskId: string };
  Category: Models['Category'] & { categoryId: string };
  Todo: Models['Todo'] & { todoId: string };
  User: Omit<Models['User'], 'password'> & { userId: string };
  Settings: Models['Settings'];
};

// COMPLEX
// export type ClientModel = Record<
//   keyof Models,
//   {
//     Task: Models['Task'] & { taskId: string };
//     Category: Models['Category'] & { categoryId: string };
//     Todo: Models['Todo'] & { todoId: string };
//     User: Omit<Models['User'], 'password'> & { userId: string };
//     Settings: Models['Settings'];
//   }[keyof Models]
// >;

export type Requests = {
  GetTasks: paths['/tasks']['get']['parameters']['query']['month'];
  AddTask: paths['/tasks']['post']['requestBody']['content']['application/json'];
  SaveTask: paths['/tasks/{taskId}']['patch']['requestBody']['content']['application/json'];
  RemoveTask: paths['/tasks/{taskId}']['delete']['parameters']['path']['taskId'];
  AddCategory: paths['/categories']['post']['requestBody']['content']['application/json'];
  UpdateCategory: paths['/categories/{categoryId}']['patch']['requestBody']['content']['application/json'];
  RemoveCategory: string; // categoryId
  UpdateSettings: paths['/settings']['patch']['requestBody']['content']['application/json'];
  AddTodo: Omit<Models['Todo'], 'isDone'>;
  UpdateTodo: Partial<ClientModel['Todo']> & Pick<ClientModel['Todo'], 'todoId'>;
  RemoveTodo: string; // todoId
  SignUp: Models['User'];
  SignIn: paths['/user']['post']['requestBody']['content']['application/json'];
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
