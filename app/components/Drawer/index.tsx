import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import TimeIcon from '@material-ui/icons/AlarmOn';
import ReportsIcon from '@material-ui/icons/Description';
import { routePath } from 'config';
import FeaturePage from 'containers/FeaturePage';
import { HistoryPage } from 'containers/HistoryPage';
import { Profile } from 'containers/Profile';
import { useStyles } from './styles';

interface OwnProps {
    open: boolean;
    toggleDrawerState: () => void;
}

type Props = OwnProps;

export default function PersistentDrawerLeft(props: Props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.toggleDrawerState}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            className={classes.listItem}
            component={Link}
            to={routePath.featuresPath}
          >
            <ListItemIcon>
              <TimeIcon className={classes.itemIcon} />
            </ListItemIcon>
            <ListItemText
              className={classes.itemText}
              primary="Create Report"
            />
          </ListItem>

          <ListItem
            button
            className={classes.listItem}
            component={Link}
            to={routePath.reportHistoryPath}
          >
            <ListItemIcon>
              <ReportsIcon className={classes.itemIcon} />
            </ListItemIcon>
            <ListItemText
              className={classes.itemText}
              primary="Report History"
            />
          </ListItem>

          <ListItem
            button
            className={classes.listItem}
            component={Link}
            to={routePath.profilePath}
          >
            <ListItemIcon>
              <FaceIcon className={classes.itemIcon} />
            </ListItemIcon>
            <ListItemText className={classes.itemText} primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path={routePath.featuresPath} component={FeaturePage} />
          <Route path={routePath.reportHistoryPath} component={HistoryPage} />
          <Route path={routePath.profilePath} component={Profile} />
        </Switch>
      </main>
    </div>
  );
}
