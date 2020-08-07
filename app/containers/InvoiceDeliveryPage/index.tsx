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
import reducer from './reducer';
import { RootState } from './types';
import saga from './saga';
import { useStyles } from './styles';
import { useAlert } from 'react-alert';
import { Report, Customer } from '../HomePage/types.d';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomerTitle from 'components/CustomerTitle';
import { Employee } from '../App/types.d';
import InvoiceDelivery from 'components/InvoiceDelivery';
import {
  deliverInvoiceAction,
  clearDeliverInvoiceErrorAction
} from './actions';
import { makeSelectInvoiceDeliveryFailed } from './selectors';

interface OwnProps {
  reports: Report[];
  customers: Customer[];
  employees: Employee[];
}

interface StateProps {
  deliverInvoiceFailed: boolean;
}

interface DispatchProps {
  onDeliverInvoice(
    customerId: string,
    startDate: Date,
    endDate: Date,
    reportIds: number[]
  ): void;
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'invoiceDeliveryPage';

export function InvoiceDeliveryPage(props: Props) {
  useInjectSaga({ key, saga: saga });
  useInjectReducer({ key, reducer: reducer });
  const alert = useAlert();
  const classes = useStyles();

  if (props.deliverInvoiceFailed) {
    alert.show('There was a problem delivering the invoice', {
      timeout: 4000,
      type: 'error',
      transition: 'scale'
    });
    clearDeliverInvoiceErrorAction();
  }

  const customersHash = {};
  props.reports.forEach(report => {
    customersHash[report.customerId] = [
      ...(customersHash[report.customerId]
        ? customersHash[report.customerId]
        : []),
      report
    ];
  });

  return Object.keys(customersHash).length ? 
  (
    <div className={classes.root}>
      {Object.keys(customersHash).map(customerId => (
        <Accordion key={customerId}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <CustomerTitle
              customer={
                props.customers.find(
                  customer => customer.id.toString() === customerId
                )!
              }
              reportsNumber={customersHash[customerId].length}
            />
          </AccordionSummary>
          <AccordionDetails>
            <InvoiceDelivery
              reports={customersHash[customerId]}
              employees={props.employees}
              onDeliverInvoice={(
                invoiceStartDate: Date,
                invoiceEndDate: Date,
                reportIds: number[]
              ) => {
                props.onDeliverInvoice(
                  customerId,
                  invoiceStartDate,
                  invoiceEndDate,
                  reportIds
                );
              }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  ) :
  (
      <h1 className={classes.noReports}>No reports have been submitted</h1>
  );
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  deliverInvoiceFailed: makeSelectInvoiceDeliveryFailed()
});

// Map Disptach to your DispatchProps
function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    onDeliverInvoice: (
      customerId: string,
      startDate: Date,
      endDate: Date,
      reportIds: number[]
    ) =>
      dispatch(deliverInvoiceAction(customerId, startDate, endDate, reportIds)),
    dispatch: dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(InvoiceDeliveryPage);
