// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import navbarReducer from './slices/navBarSlice'
import graphclientReducer from './slices/graphClientSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    navBar: navbarReducer,
    graphClient: graphclientReducer
  },
});

export default store;
