import React from 'react';
import { cleanup, render } from '@/test-utils';
import { BranchItem } from '@/components';
import { BranchSummary } from '@/store/branch-slice/branch';
import { FetchStatusEnum } from '@/interfaces';

const fakeBranchSummary: BranchSummary = {
  id: 'id',
  name: 'fake branch',
  repositoryId: 'repoId',
};

describe('BranchItem', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders branch name', () => {
    const container = render(<BranchItem branch={fakeBranchSummary} />);
    const span = container.getByText(fakeBranchSummary.name, { selector: 'span' });
    expect(span).toBeInTheDocument();
  });

  it('renders InlineLoading component when isActive and loading', () => {
    const container = render(<BranchItem branch={fakeBranchSummary} />, {
      preloadedState: { branch: { loadingBranch: fakeBranchSummary, status: { fetchBranch: FetchStatusEnum.LOADING } } },
    });
    const icon = container.getByTitle('Active loading indicator');
    expect(icon).toBeInTheDocument();
  });
});
