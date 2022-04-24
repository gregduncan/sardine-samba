import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HttpClient, { RepositoryDoc, RepositoryListDoc } from 'http-client';
import _ from 'lodash';
import { findLink } from '@/helpers';
import __reset from '../__reset';
import { addBranchAsync } from '../branch-slice/branch-shared-actions';
import type { RootState } from '../store';
import Repository from './repository';
import { setSelectedRepository } from './repository-shared-actions';
import { FetchStatusEnum } from '@/interfaces';

export interface RepositoryState {
  repositories: Record<string, Repository> | null;
  selectedRepository: Repository | null;
  status: FetchStatusEnum;
}

const initialState: RepositoryState = {
  repositories: null,
  selectedRepository: null,
  status: FetchStatusEnum.IDLE,
};

export const fetchRepositoriesAsync = createAsyncThunk('repository/fetchList', () => {
  return HttpClient.get<RepositoryListDoc>('/repositoryList');
});

export const fetchRepositoryAsync = createAsyncThunk('repository/fetch', (repository: Repository) => {
  return HttpClient.get<RepositoryDoc>(findLink(repository.links, 'self')!.href);
});

const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setSelectedRepository, (state, action) => {
        state.selectedRepository = state.repositories![action.payload];
      })
      .addCase(fetchRepositoriesAsync.pending, state => {
        state.status = FetchStatusEnum.LOADING;
      })
      .addCase(fetchRepositoriesAsync.fulfilled, (state, action) => {
        state.status = FetchStatusEnum.IDLE;
        state.repositories = Object.fromEntries(action.payload.item.map(r => [r.item.id, makeRepoFromDoc(r)]));
      })
      .addCase(fetchRepositoryAsync.fulfilled, (state, action) => {
        state.repositories![action.payload.item.id] = state.selectedRepository = makeRepoFromDoc(action.payload);
      })
      .addCase(addBranchAsync.fulfilled, (state, action) => {
        const branch = _.pick(action.payload.item, 'id', 'name', 'repositoryId');
        state.selectedRepository!.branchSummaries[branch.id] = branch;
      })
      .addCase(__reset, state => {
        Object.assign(state, _.cloneDeep(initialState));
        setTimeout(() => {
          const store = (require('@/store/store') as typeof import('../store')).store;
          store.dispatch(fetchRepositoriesAsync());
        });
      });
  },
});

const makeRepoFromDoc = (doc: RepositoryDoc): Repository => {
  const { item, links } = doc;

  return {
    ...item,
    links,
    readonly: !findLink(links, 'AddBranch'),
  };
};

export const selectRepositories = (state: RootState) => state.repository.repositories;
export const selectFetchRepositoryStatus = (state: RootState) => state.repository.status;
export const selectSelectedRepository = (state: RootState) => state.repository.selectedRepository;

export default repositorySlice.reducer;
