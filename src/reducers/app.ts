import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isSidebarOpen: boolean;
};

const initialState: InitialState = {
  isSidebarOpen: false,
};

export const { reducer, actions } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar(state): void {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});
