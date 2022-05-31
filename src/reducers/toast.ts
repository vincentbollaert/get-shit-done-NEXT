import { createSlice, nanoid } from '@reduxjs/toolkit';

type InitialState = {
  toast: {
    id: string;
    message: string;
    messagePrefix: string;
  };
  undoId?: string;
};
const initialState: InitialState = {
  toast: {
    id: nanoid(),
    message: '',
    messagePrefix: '',
  },
  undoId: undefined,
};

export const { reducer, actions } = createSlice({
  name: 'toastMessages',
  initialState: initialState,
  reducers: {
    addToast(state, { payload }) {
      state.toast = {
        id: nanoid(),
        message: payload.message,
        messagePrefix: payload.prefix,
      };
    },
    removeToast(state) {
      state.toast = initialState.toast;
    },
    undo(state) {
      state.undoId = nanoid();
    },
  },
});
