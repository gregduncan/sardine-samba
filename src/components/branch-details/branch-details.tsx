import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { SkeletonPlaceholder, Tile } from 'carbon-components-react';
import { useAppSelector } from '@/store/hooks';
import { selectFetchBranchStatus, selectLoadingBranch, selectSelectedBranch } from '@/store/branch-slice/branch-slice';
import { FetchStatusEnum } from '@/interfaces';

const useStyles = makeStyles({
  root: {
    gridArea: 'branchInfo',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height: '100%',
    '& > h3': {
      marginBottom: 16,
    },
  },
  skeleton: {
    width: '50%',
    maxWidth: 500,
  },
  tile: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto 1fr',
    minWidth: '500px',
    gap: '4px 8px',
    whiteSpace: 'pre-wrap',
    '& > :nth-child(2n + 1)': {
      textAlign: 'end',
    },
  },
  spanAll: {
    gridColumn: '1 / -1',
    minWidth: '100%',
  },
});

export const BranchDetails: FC = () => {
  const classes = useStyles();
  const loadingBranch = useAppSelector(selectLoadingBranch);
  const selectedBranch = useAppSelector(selectSelectedBranch);
  const status = useAppSelector(selectFetchBranchStatus);

  if (!selectedBranch && !loadingBranch) {
    return null;
  }

  return (
    <div className={classes.root}>
      <h3>{loadingBranch?.name}</h3>
      {status === FetchStatusEnum.LOADING && <SkeletonPlaceholder className={classes.skeleton} data-testid="skeleton-place-holder" />}
      {status === FetchStatusEnum.IDLE && selectedBranch && (
        <Tile className={classes.tile}>
          <span>Repository ID:</span>
          <span>{selectedBranch.repositoryId}</span>
          <span>Branch ID:</span>
          <span>{selectedBranch.id}</span>
          <span>Date created:</span>
          <span>{selectedBranch.dateCreated}</span>
          <hr className={classes.spanAll} />
          <div className={classes.spanAll}>{selectedBranch.details}</div>
        </Tile>
      )}
    </div>
  );
};
