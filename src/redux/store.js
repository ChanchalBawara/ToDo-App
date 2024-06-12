import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

// Configure the Redux store with the task reducer
const store = configureStore({
  reducer: {
    tasks: taskReducer, // Add task reducer to the store
  },
});

export default store;
