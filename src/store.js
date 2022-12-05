import { configureStore } from '@reduxjs/toolkit';
import appInfo from './reduxSlice/appSlice';

export const store = configureStore({
  reducer: {
    appInfo,
  },
});
