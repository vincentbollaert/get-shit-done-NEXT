import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDays } from 'date-fns/addDays';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';
import { eachWeekOfInterval } from 'date-fns/eachWeekOfInterval';
import { format } from 'date-fns/format';
import { subDays } from 'date-fns/subDays';
import { ClientModel, Models } from '~/api/types';
import { HOURS_IN_DAY } from '~/shared/constants';
import { generateMonthDays, generateMonthDayStrings } from '~/shared/utils';

type UnsavedTask = Models['Task'];

// TODO: Add object for meta values
export type TaskWithMeta = ClientModel['Task'] & {
  heightInFlex?: number;
  gapBefore?: number;
  gapAfter?: number;
};
type InitialState = {
  focusedTimestamp?: string;
  taskBeingPrepared?: UnsavedTask;
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
      const days = generateMonthDays()
        .filter((day) => Number(format(day, 'd')) >= from && Number(format(day, 'd')) <= to)
        .map((day) => day.toString());
      state.daysAxis = days;
    },
    setDays(state, { payload: { period } }: PayloadAction<{ period: ClientModel['Settings']['daysToShow'] }>) {
      const today = new Date();
      if (period === '1month') {
        state.daysAxis = generateMonthDayStrings();
      } else if (period === '3weeks') {
        const weeks = eachWeekOfInterval({ start: subDays(today, 7), end: addDays(today, 7) });
        state.daysAxis = eachDayOfInterval({ start: weeks[0], end: weeks[weeks.length - 1] }).map((date) =>
          date.toString(),
        );
      } else if (period === '1week') {
        const weeks = eachWeekOfInterval({ start: subDays(today, 7), end: today });
        state.daysAxis = eachDayOfInterval({ start: weeks[0], end: weeks[weeks.length - 1] }).map((date) =>
          date.toString(),
        );
      }
    },
    saveFocusedTimestamp(state, { payload }: PayloadAction<{ timestamp: string }>) {
      state.focusedTimestamp = payload.timestamp;
    },
    prepareTask(state, { payload }: PayloadAction<UnsavedTask>) {
      state.taskBeingPrepared = payload;
    },
    removePreparedTask(state) {
      state.taskBeingPrepared = undefined;
    },
    removeEditedTask(state) {
      state.taskBeingEdited = undefined;
    },
    editTaskPrepare(state, { payload: task }: PayloadAction<ClientModel['Task']>) {
      state.taskBeingEdited = task;
      state.taskBeingEditedClone = task;
    },
    updateEditedTask(state, { payload }: PayloadAction<ClientModel['Task']>) {
      state.taskBeingEdited = payload;
    },
    editTaskCancel(state) {
      state.taskBeingEdited = undefined;
    },
  },
});
