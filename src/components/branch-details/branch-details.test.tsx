import React from 'react';
import { cleanup, render } from '@/test-utils';
import { BranchDetails } from './branch-details';
import Branch, { BranchSummary } from '@/store/branch-slice/branch';
import { FetchStatusEnum } from '@/interfaces';

const fakeBranchSummary: BranchSummary = {
  id: 'id',
  name: 'fake branch',
  repositoryId: 'repoId',
};

const fakeBranch: Branch = {
  ...fakeBranchSummary,
  dateCreated: 'Fri, 01 Oct 2021 20:42:46 GMT',
  details: 'I could Branch 3.  But am I?',
};

const preloadedBranchState = { loadingBranch: fakeBranchSummary, selectedBranch: fakeBranch };

describe('BranchDetails', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders branch id text', () => {
    const container = render(<BranchDetails />, { preloadedState: { branch: { ...preloadedBranchState, status: { fetchBranch: FetchStatusEnum.IDLE } } } });
    const span = container.getByText(fakeBranch.id, { selector: 'span' });
    expect(span).toBeInTheDocument();
  });

  it('renders SkeletonPlaceholder when loading', () => {
    const container = render(<BranchDetails />, { preloadedState: { branch: { ...preloadedBranchState, status: { fetchBranch: FetchStatusEnum.LOADING } } } });
    const loader = container.getByTestId('skeleton-place-holder');
    expect(loader).toBeInTheDocument();
  });

  it('renders null when no branch loading or selected branch', () => {
    const { container } = render(<BranchDetails />, { preloadedState: { branch: { loadingBranch: undefined, selectedBranch: undefined } } });
    expect(container.firstChild).toBeNull();
  });
});
