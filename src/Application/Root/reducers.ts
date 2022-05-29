import { combineReducers } from 'redux';
import { reducer as app } from '~/reducers/app';
import { reducer as calendar } from '~/reducers/calendar';
import { reducer as toast } from '~/reducers/toast';

export const rootReducer = combineReducers({
  app,
  calendar,
  toast,
});

export type AppState = ReturnType<typeof rootReducer>;
