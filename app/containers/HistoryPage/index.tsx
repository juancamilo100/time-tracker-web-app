/*
 *
 * HistoryPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose, Dispatch } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectHistoryPage from './selectors';
import reducer from './reducer';
import { RootState } from './types';
import saga from './saga';
import messages from './messages';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ReportHistoryList from 'components/ReportHistoryList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

interface OwnProps {}

interface StateProps {}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

export function HistoryPage(props: Props) {
  useInjectReducer({ key: 'historyPage', reducer: reducer });
  useInjectSaga({ key: 'historyPage', saga: saga });

  const classes = useStyles();

  return (
    <div className={classes.center}>
      {/* <FormattedMessage {...messages.header} /> */}
      <ReportHistoryList></ReportHistoryList>
    </div>
  );
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  historyPage: makeSelectHistoryPage(),
});

// Map Disptach to your DispatchProps
function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    dispatch: dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HistoryPage);
