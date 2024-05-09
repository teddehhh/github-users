import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../slices/filter';
import userReducer from '../slices/user';

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      user: userReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
