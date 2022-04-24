import React, { FC, FocusEvent, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { InlineLoading, SideNavMenuItem } from 'carbon-components-react';
import { BranchSummary } from '@/store/branch-slice/branch';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBranchDetailsAsync, selectFetchBranchStatus, selectLoadingBranch } from '@/store/branch-slice/branch-slice';
import { selectSelectedRepository } from '@/store/repository-slice/respository-slice';
import { FetchStatusEnum } from '@/interfaces';

const useItemStyles = makeStyles({
  root: {
    '& > .bx--side-nav__link': {
      width: '100%',

      '& > .bx--side-nav__link-text': {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
      },
    },
  },
  loading: {
    minHeight: 'unset',
    width: 'unset',
  },
});

export const BranchItem: FC<{ branch: BranchSummary; disabled?: boolean }> = ({ branch, disabled }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectFetchBranchStatus);
  const selectedRepo = useAppSelector(selectSelectedRepository);
  const loadingBranch = useAppSelector(selectLoadingBranch);
  const classes = useItemStyles();

  const [isActive, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(loadingBranch?.id === branch.id);
  }, [loadingBranch, branch]);

  const handleFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.target.blur();
    }
  };

  const handleClick = () => {
    if (selectedRepo) {
      dispatch(fetchBranchDetailsAsync({ repository: selectedRepo, branch: branch }));
    }
  };

  return (
    <SideNavMenuItem aria-current={isActive && 'page'} className={classes.root} href="#" isActive={isActive} onClick={handleClick} onFocus={handleFocus}>
      {branch.name}
      {status === FetchStatusEnum.LOADING && isActive && <InlineLoading className={classes.loading} />}
    </SideNavMenuItem>
  );
};
