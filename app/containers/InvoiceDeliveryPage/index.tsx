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
import { Report, Customer } from '../HomePage/types.d';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomerTitle from 'components/CustomerTitle';
import { Employee } from '../App/types.d';
import InvoiceDelivery from 'components/InvoiceDelivery';

interface OwnProps {
  reports: Report[];
  customers: Customer[];
  employees: Employee[];
}

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

  const customersHash = {};
  props.reports.forEach(report => {
    customersHash[report.customerId] = [
      ...(customersHash[report.customerId]
        ? customersHash[report.customerId]
        : []),
      report
    ];
  });

  return (
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
            <InvoiceDelivery reports={customersHash[customerId]} employees={props.employees} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
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
