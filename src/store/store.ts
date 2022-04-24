import { Action, ThunkAction, configureStore, createReducer } from '@reduxjs/toolkit';
import HttpClient from 'http-client';
import __reset from './__reset';
import branchReducer from './branch-slice/branch-slice';
import repositoryReducer from './repository-slice/respository-slice';

export const store = configureStore({
  devTools: true,
  reducer: {
    repository: repositoryReducer,
    branch: branchReducer,
    __reset: createReducer<unknown>({}, builder => {
      builder.addCase(__reset, () => {
        HttpClient.__reset();
      });
    }),
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
