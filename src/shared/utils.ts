import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import cloneDeep from 'lodash/cloneDeep';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import sub from 'date-fns/sub';
import { RTKQueryStatus, ClientModel, TasksByDay } from '~/api/types';
import { AsyncStatus } from '~/shared/types';

export const generateMonthDays = (date: Date = new Date()) =>
  eachDayOfInterval({
    start: sub(lastDayOfMonth(date), { days: getDaysInMonth(date) - 1 }),
    end: lastDayOfMonth(date),
  });

export const generateMonthDayStrings = (date: Date = new Date()) =>
  generateMonthDays(date).map((date) => date.toString());

export const taskSort = (a: ClientModel['Task'], b: ClientModel['Task']) => a.time[0] - b.time[0];

export const determinePlaceholderHeight = ({ wrapRef, hoursAxis }: any) =>
  wrapRef.current ? wrapRef.current.getBoundingClientRect().height / (hoursAxis.length * 2) : 0;

export const payloadError = ({ _id, error }: { _id?: string; error: string }) => ({ _id, error });

// TODO: This needs an overhaul
export const mapTasksByDay = (hoursAxis: number[], allTasksByDay?: TasksByDay) => {
  if (!allTasksByDay) return {};

  const makeAllTasksByDayTest = cloneDeep(allTasksByDay);

  Object.entries(allTasksByDay).forEach(([datestring, day]) => {
    makeAllTasksByDayTest[datestring].tasks = day.tasks.map((task, taskIndex) => {
      const { taskId, time, ...rest } = task;

      const [from, to] = time;
      const isFirstTask = taskIndex === 0;
      const isLastTask = taskIndex === day.tasks.length - 1;
      const previousTo = !isFirstTask ? day.tasks[taskIndex - 1].time[1] : 0;
      const firstHour = hoursAxis[0];
      const lastHourAdjusted = hoursAxis[hoursAxis.length - 1] + 1;

      const heightInFlex = Math.min(to, lastHourAdjusted) - Math.max(from, firstHour);
      const gapBefore = Math.min(from - previousTo, from - firstHour, lastHourAdjusted - previousTo);
      const gapAfter = isLastTask ? lastHourAdjusted - to : 0;

      return {
        taskId,
        heightInFlex,
        gapBefore,
        gapAfter,
        time,
        ...rest,
      };
    });
  });

  return makeAllTasksByDayTest;
};

export function getAsyncStatus(asyncStatus: RTKQueryStatus, requestParam?: string): AsyncStatus | undefined {
  const { originalArgs } = asyncStatus;
  // console.log('found?', requestParam, asyncStatus.originalArgs);
  if (requestParam && requestParam !== originalArgs && !Object.values(originalArgs || {}).includes(requestParam))
    return;

  return {
    ...asyncStatus,
    errorMessage: transformQueryError(asyncStatus.error),
  };
}

export function transformQueryError(queryError?: FetchBaseQueryError | SerializedError) {
  if (queryError) {
    if ('status' in queryError) {
      const errorMessage = 'error' in queryError ? queryError.error : JSON.stringify(queryError.data);
      return errorMessage;
    } else {
      return queryError.message;
    }
  }
  return undefined;
}
