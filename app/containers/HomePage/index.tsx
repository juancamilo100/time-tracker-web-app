import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { RootState } from './types';
import Drawer from '../../components/Drawer';
import { makeSelectAuthenticated } from 'containers/App/selectors';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';
import { routePath } from 'config';
import clsx from 'clsx';
import { makeSelectDrawerOpen } from './selectors';
import { toggleDrawerState } from './actions';

// tslint:disable-next-line:no-empty-interface
interface OwnProps {}

interface StateProps {
  authenticated: boolean;
  drawerOpen: boolean;
}

interface DispatchProps {
  onToggleDrawerState(): void;
}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'home';

export function HomePage(props: Props) {
    console.log("Rendering home page!");
    console.log(props);
    
    
  const classes = useStyles();
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  const layout = (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
        [classes.appBarShift]: props.drawerOpen,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.onToggleDrawerState}
            edge="start"
            className={clsx(classes.menuButton, props.drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Time Tracker
          </Typography>
          <Button
            color="inherit"
            onClick={() => {}}
            component={Link}
            to={routePath.loginPath}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer toggleDrawerState={props.onToggleDrawerState} open={props.drawerOpen} />
    </>
  );

  const content = props.authenticated ? layout : <Redirect to="/login" />;

  return content;
}

// Map Disptach to your DispatchProps
export function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    onToggleDrawerState: () => dispatch(toggleDrawerState()),
  };
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  drawerOpen: makeSelectDrawerOpen(),
  authenticated: makeSelectAuthenticated(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
