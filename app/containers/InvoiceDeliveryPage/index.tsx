/*
 *
 * invoiceDelivery
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectInvoiceDelivery from './selectors';
import reducer from './reducer';
import { RootState } from './types';
import saga from './saga';
import { useStyles } from './styles';
import { useAlert } from 'react-alert';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {
  dispatch?: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'invoiceDeliveryPage';
export function InvoiceDeliveryPage(props: Props) {
  useInjectReducer({ key, reducer: reducer });
  useInjectSaga({ key, saga: saga });
  const alert = useAlert();
  const classes = useStyles();

  return <h1>INVOICE DELIVERY</h1>;
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  invoiceDelivery: makeSelectInvoiceDelivery()
});

// Map Disptach to your DispatchProps
function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    dispatch: dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(InvoiceDeliveryPage);
