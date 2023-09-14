import { createSlice } from '@reduxjs/toolkit';

const navBarSlice = createSlice({
  name: 'navBar',
  initialState: [{ name: "Home" , id: "root" }],
  reducers: {
    push: (state, action) => {
      state.push(action.payload); // Append the JSON object from the action payload
    },
    multiPop: (state, action) => {
      while (state.length > 1 && state[state.length - 1].id !== "root" && state[state.length - 1].id !== action.payload.id) {
        state.pop();
      }
    }
  },
});
export const { push, multiPop } = navBarSlice.actions;
export default navBarSlice.reducer;