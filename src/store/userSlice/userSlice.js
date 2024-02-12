import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) ?? false,
  };

  const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginUser: (state, action) => {
          const userString = JSON.stringify(action.payload);
          state.user = userString;
          localStorage.setItem('user', userString);
      },
      singOutUser: state => {
        state.user = false
        localStorage.removeItem('user')
      }
    },
  });

  export const { loginUser, singOutUser } = user.actions;
export default user.reducer;