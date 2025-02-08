import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../Application/Root';

export const makeDaysAxis = createSelector(
  (state: AppState) => state.calendar.daysAxis,
  (daysAxis) => daysAxis,
);

export const makeHoursAxis = createSelector(
  (state: AppState) => state.calendar.hoursAxis,
  (hoursAxis) => hoursAxis,
);
