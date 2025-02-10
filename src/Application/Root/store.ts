import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { tasksApi } from '~/api/requests';
import { reducer as app } from '~/reducers/app';
import { reducer as calendar } from '~/reducers/calendar';
import { reducer as toast } from '~/reducers/toast';

const rootReducer = combineReducers({
  app,
  calendar,
  toast,
  [tasksApi.reducerPath]: tasksApi.reducer,
});

const resettableReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: resettableReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
});

// if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
//   (module as any).hot.accept('./reducers', () => store.replaceReducer(reducers))
// }

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
