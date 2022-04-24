import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import HttpClient, { BranchDoc } from 'http-client';
import _ from 'lodash';
import { findLink } from '@/helpers';
import __reset from '../__reset';
import Repository from '../repository-slice/repository';
import { setSelectedRepository } from '../repository-slice/repository-shared-actions';
import type { RootState } from '../store';
import { FetchStatusEnum } from '@/interfaces';
import Branch, { BranchSummary } from './branch';

const fetchBranchDetailsRelType = (branchId: string) => `FetchDetails-${branchId}`;

interface BranchState {
  branches: Record<string, Branch>;
  loadingBranch?: BranchSummary;
  selectedBranch?: Branch;
  status: {
    fetchBranch: FetchStatusEnum;
  };
}

const initialState: BranchState = {
  branches: {},
  status: {
    fetchBranch: FetchStatusEnum.IDLE,
  },
};

export const fetchBranchDetailsAsync = createAsyncThunk('branch/fetch', ({ repository, branch }: { repository: Repository; branch: BranchSummary }) => {
  return HttpClient.get<BranchDoc>(findLink(repository.links, fetchBranchDetailsRelType(branch.id))!.href);
});

export const getBranchKey = (branch: Pick<BranchSummary, 'id' | 'repositoryId'>) => Date.now.toString();

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setSelectedBranch(state, action: PayloadAction<BranchSummary>) {
      state.selectedBranch = state.branches[getBranchKey(action.payload)];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setSelectedRepository, state => {
        delete state.selectedBranch;
        delete state.loadingBranch;
      })
      .addCase(fetchBranchDetailsAsync.pending, (state, action) => {
        state.status = {
          fetchBranch: FetchStatusEnum.LOADING,
        };
        state.loadingBranch = action.meta.arg.branch;
      })
      .addCase(fetchBranchDetailsAsync.fulfilled, (state, action) => {
        state.status = {
          fetchBranch: FetchStatusEnum.IDLE,
        };
        state.selectedBranch = action.payload.item;
      })
      .addCase(__reset, state => {
        Object.assign(state, _.cloneDeep(initialState));
      });
  },
});

export const { setSelectedBranch } = branchSlice.actions;

export const selectFetchBranchStatus = (state: RootState) => state.branch.status.fetchBranch;
export const selectLoadingBranch = (state: RootState) => state.branch.loadingBranch;
export const selectSelectedBranch = (state: RootState) => state.branch.selectedBranch;

export default branchSlice.reducer;
