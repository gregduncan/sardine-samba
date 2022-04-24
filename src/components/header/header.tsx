import React from 'react';
import { Restore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Header as BXHeader, HeaderGlobalAction, HeaderGlobalBar, HeaderName } from 'carbon-components-react';
import moment from 'moment';
import { useAppDispatch } from '@/store/hooks';
import pkg from '../../../package.json';

const useStyles = makeStyles({
  root: {
    gridArea: 'header',
    position: 'static',
  },
});

export const Header = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <BXHeader aria-label="" className={classes.root}>
      <HeaderName prefix="Milliman LTS">
        {pkg.author.name}&apos; repos &mdash; {moment().format('dddd, MMMM do, YYYY')}
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Reset state" onClick={() => dispatch({ type: '__reset' })} tooltipAlignment="end">
          <Restore />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </BXHeader>
  );
};
