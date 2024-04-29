import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface IFilter {
  login: string;
  userType: string[];
}

export const slice = createSlice({
  name: 'filter',
  initialState: { filter: { login: '', userType: ['user'] } as IFilter },
  reducers: {
    change: (state, action: PayloadAction<IFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { change } = slice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default slice.reducer;
