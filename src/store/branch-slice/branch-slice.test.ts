import { AnyAction } from 'redux';
import Branch from './branch';
import reducer, { fetchBranchDetailsAsync, getBranchKey, selectFetchBranchStatus, selectLoadingBranch, selectSelectedBranch, setSelectedBranch } from './branch-slice';
import { FetchStatusEnum } from '@/interfaces';
jest.useFakeTimers();

const fakeBranch: Branch = {
  dateCreated: 'date-created',
  details: 'details',
  id: 'id',
  name: 'fake branch',
  repositoryId: 'repoId',
};

const fakeBranchKey = getBranchKey(fakeBranch);
const defaultValue = reducer(undefined, {} as AnyAction);

describe('branchSlice', () => {
  afterEach(jest.runAllTimers);

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toMatchInlineSnapshot(`
      Object {
        "branches": Object {},
        "status": Object {
          "fetchBranch": "idle",
        },
      }
    `);
  });

  it('should set the selected branch', () => {
    expect(reducer({ ...defaultValue, branches: { [fakeBranchKey]: fakeBranch } }, setSelectedBranch(fakeBranch)).selectedBranch).toBe(fakeBranch);
  });

  // TODO: Improve the following tests initiating fetchBranchDetailsAsync...
  it('should set status.fetchBranch to loading when the branch details are being fetched', () => {
    expect(reducer({ ...defaultValue, status: { fetchBranch: FetchStatusEnum.LOADING } }, {} as AnyAction).status.fetchBranch).toBe(FetchStatusEnum.LOADING);
  });

  it('should set status.fetchBranch to idle after the branch details have been fetched', () => {
    expect(reducer({ ...defaultValue, status: { fetchBranch: FetchStatusEnum.IDLE } }, {} as AnyAction).status.fetchBranch).toBe(FetchStatusEnum.IDLE);
  });
});
