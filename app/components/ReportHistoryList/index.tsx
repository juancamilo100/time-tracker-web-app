/**
 *
 * ReportHistoryList
 *
 */
import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function ReportHistoryList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemText primary="Spectrio Report #87" secondary="Sep 9, 2019" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <GetAppOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Spectrio Report #88"
            secondary="Sep 23, 2019"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <GetAppOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}

export default ReportHistoryList;
