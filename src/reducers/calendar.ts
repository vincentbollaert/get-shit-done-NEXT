import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import format from 'date-fns/format';
import { Task, TaskUnsaved } from '~/api/types';
import { HOURS_IN_DAY } from '~/shared/constants';
import { generateMonthDays, generateMonthDayStrings } from '~/shared/utils';

// TODO: Add object for meta values
export type TaskWithMeta = Task & {
  heightInFlex?: number;
  gapBefore?: number;
  gapAfter?: number;
};
type InitialState = {
  focusedTimestamp?: string;
  taskBeingPrepared?: TaskUnsaved;
  taskBeingEdited?: TaskWithMeta;
  taskBeingEditedClone?: TaskWithMeta;
  hoursAxis: number[];
  daysAxis: string[];
};
const initialState: InitialState = {
  focusedTimestamp: undefined,
  taskBeingPrepared: undefined,
  taskBeingEdited: undefined,
  taskBeingEditedClone: undefined,
  hoursAxis: HOURS_IN_DAY,
  daysAxis: generateMonthDayStrings(),
};

export const { reducer, actions } = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    filterHours(state, { payload: { from, to } }: PayloadAction<{ from: number; to: number }>) {
      state.hoursAxis = HOURS_IN_DAY.filter((hour) => hour >= from && hour <= to);
    },
    filterDays(state, { payload: { from, to } }: PayloadAction<{ from: number; to: number }>) {
      state.daysAxis = generateMonthDays()
        .filter((day) => format(day, 'd') >= String(from) && format(day, 'd') <= String(to))
        .map((day) => day.toString());
    },
    saveFocusedTimestamp(state, { payload }: PayloadAction<{ timestamp: string }>) {
      state.focusedTimestamp = payload.timestamp;
    },
    prepareTask(state, { payload }: PayloadAction<TaskUnsaved>) {
      state.taskBeingPrepared = payload;
    },
    removePreparedTask(state) {
      state.taskBeingPrepared = undefined;
    },
    removeEditedTask(state) {
      state.taskBeingEdited = undefined;
    },
    editTaskPrepare(state, { payload: task }: PayloadAction<Task>) {
      state.taskBeingEdited = task;
      state.taskBeingEditedClone = task;
    },
    updateEditedTask(state, { payload }: PayloadAction<Task>) {
      state.taskBeingEdited = payload;
    },
    editTaskCancel(state) {
      state.taskBeingEdited = undefined;
    },
  },
});
