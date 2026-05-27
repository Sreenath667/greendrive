import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import treeReducer from './treeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tree: treeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;