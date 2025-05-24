import { configureStore } from '@reduxjs/toolkit';
import downloadReducer from './downloadSlice';
import licenseReducer from './licenseSlice';

export const store = configureStore({
  reducer: {
    download: downloadReducer,
    license: licenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
