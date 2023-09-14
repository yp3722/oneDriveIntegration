// src/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const graphClientSlice = createSlice({
  name: 'graphClient',
  initialState: null,
  reducers: {
    update: (state,action) => {
        console.log('reached client reducer',action.payload)
        return action.payload
    },
  },
});

export const { update} = graphClientSlice.actions;
export default graphClientSlice.reducer;
