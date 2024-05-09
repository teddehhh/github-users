import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface IUser {
  info: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
  accessToken: string;
}

export const slice = createSlice({
  name: 'user',
  initialState: {
    user: {
      info: { name: '', email: '', image: '' },
      expires: '',
      accessToken: '',
    },
  },
  reducers: {
    change: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { change } = slice.actions;

export const selectUser = (state: RootState) => state.user;

export default slice.reducer;
