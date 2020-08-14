import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { RootState, Report } from './types';
import Drawer from '../../components/Drawer';
import {
  makeSelectAuthenticated,
  makeSelectEmployee,
  makeSelectEmployees,
  makeSelectReports,
  makeSelectCustomer,
  makeSelectCustomers
} from 'containers/App/selectors';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { routePath } from 'config';
import clsx from 'clsx';
import { makeSelectDrawerOpen } from './selectors';
import { toggleDrawerState } from './actions';
import CreateReportPage from 'containers/CreateReportPage';
import { ReportHistoryPage } from '../ReportHistoryPage/index';
import { ProfilePage } from 'containers/ProfilePage';
import InvoiceDeliveryPage from 'containers/InvoiceDeliveryPage';
import { logout } from 'containers/App/actions';
import { Employee } from '../App/types.d';
import { Customer } from './types.d';

// tslint:disable-next-line:no-empty-interface
interface OwnProps {
  isAdminUser: boolean;
}

interface StateProps {
  authenticated: boolean;
  drawerOpen: boolean;
  employee: Employee;
  employees: Employee[];
  reports: Report[];
  customer: Customer;
  customers: Customer[];
}

interface DispatchProps {
  onToggleDrawerState(): void;
  onLogout(): void;
}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'home';

const devRoutes = props => (
  <>
    <Route
      path={routePath.featuresPath}
      render={() => (
        <CreateReportPage
          customer={props.customer}
          employee={props.employee}
          report={props.reports.find(report => report.submitted === false)}
        />
      )}
    />
    <Route
      path={routePath.reportHistoryPath}
      render={() => (
        <ReportHistoryPage reports={props.reports} customer={props.customer} />
      )}
    />
  </>
);

const adminRoutes = props => (
  <>
    <Route
      path={routePath.invoiceDeliveryPath}
      render={() => (
        <InvoiceDeliveryPage
          reports={props.reports}
          customers={props.customers}
          employees={props.employees}
        />
      )}
    />
  </>
);

export function HomePage(props: Props) {
  const classes = useStyles();
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  if (!props.authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.drawerOpen
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.onToggleDrawerState}
            edge="start"
            className={clsx(
              classes.menuButton,
              props.drawerOpen && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Time Tracker
          </Typography>
          <Button
            color="inherit"
            onClick={props.onLogout}
            component={Link}
            to={routePath.loginPath}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        toggleDrawerState={props.onToggleDrawerState}
        open={props.drawerOpen}
        isAdmin={props.isAdminUser}
      />
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: props.drawerOpen
        })}
      >
        <Switch>
          <Route path={routePath.profilePath} component={ProfilePage} />
          {props.isAdminUser ? adminRoutes(props) : devRoutes(props)}
        </Switch>
      </div>
    </>
  );
}

// Map Disptach to your DispatchProps
export function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    onToggleDrawerState: () => dispatch(toggleDrawerState()),
    onLogout: () => dispatch(logout())
  };
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  drawerOpen: makeSelectDrawerOpen(),
  authenticated: makeSelectAuthenticated(),
  employee: makeSelectEmployee(),
  employees: makeSelectEmployees(),
  reports: makeSelectReports(),
  customer: makeSelectCustomer(),
  customers: makeSelectCustomers()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(HomePage);
