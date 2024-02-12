import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarState: false,
};

const sidebar = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    changeSidebar: (state, action) => {
      state.sidebarState = action.payload;
    },
  },
});

export const { changeSidebar } = sidebar.actions;
export default sidebar.reducer;
