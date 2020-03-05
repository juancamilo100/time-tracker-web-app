import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import { RootState } from './types';
import saga from './saga';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ReportHistoryList from 'components/ReportHistoryList';
import { Report } from 'containers/HomePage/types';
import { Customer } from '../HomePage/types.d';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

interface OwnProps {
    reports: Report[];
    customer: Customer;
}
interface StateProps {}
interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'reportHistoryPage';

export function ReportHistoryPage(props: Props) {
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  const classes = useStyles();

  return (
    <div className={classes.center}>
      <ReportHistoryList customer={props.customer} reports={props.reports} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({});

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ReportHistoryPage);
