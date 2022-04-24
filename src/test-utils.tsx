import React, { FC, ReactElement } from 'react';
import { configureStore, createReducer } from '@reduxjs/toolkit';
import { fireEvent, render as rtlRender, RenderOptions } from '@testing-library/react';
import HttpClient from 'http-client';
import _ from 'lodash';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import type { DeepPartial } from 'redux';
import __reset from './store/__reset';
import branchReducer from './store/branch-slice/branch-slice';
import repositoryReducer from './store/repository-slice/respository-slice';
import type { RootState, store as _store } from './store/store';
import { FetchStatusEnum } from '@/interfaces';

const defaultState: RootState = {
  branch: {
    branches: {},
    status: {
      fetchBranch: FetchStatusEnum.IDLE,
    },
  },
  repository: {
    repositories: null,
    selectedRepository: null,
    status: FetchStatusEnum.IDLE,
  },
  __reset: {},
};

function render(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        repository: repositoryReducer,
        branch: branchReducer,
        __reset: createReducer<unknown>({}, builder => {
          builder.addCase(__reset, () => {
            HttpClient.__reset();
          });
        }),
      },
      preloadedState: _.merge({}, defaultState, preloadedState),
    }),
    ...renderOptions
  }: { preloadedState: DeepPartial<RootState>; store?: typeof _store } & Omit<RenderOptions, 'queries' | 'wrapper'> = { preloadedState: defaultState }
) {
  const Wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export function fireChangeEvent(target: HTMLElement, value: string | number | Record<PropertyKey, any>) {
  if (typeof value !== 'object') {
    value = { value };
  }

  const eventOptions = {
    target: value,
    currentTarget: value,
  };

  act(() => {
    fireEvent.change(target, eventOptions);
  });
}

export function fireClickEvent(...[target, options]: Parameters<typeof fireEvent['click']>) {
  act(() => {
    fireEvent.click(target, options);
  });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
