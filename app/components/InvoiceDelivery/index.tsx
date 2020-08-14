/**
 *
 * InvoiceDelivery
 *
 */
import React, { memo } from 'react';
import { useStyles } from './styles';

import { Employee } from '../../containers/App/types.d';
import { Report } from '../../containers/HomePage/types.d';
import ReportDetails from 'components/ReportDetails';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';

interface Props {
  reports: Report[];
  employees: Employee[];
  onDeliverInvoice: (
    invoiceStartDate: Date,
    invoiceEndDate: Date,
    reportIds: number[]
  ) => void;
}

const updateSelectedReports = (
  state,
  index,
  allReports,
  selectedReports,
  setSelectedReports
) => {
  const selectedIndex = selectedReports.findIndex(
    report => report.id === allReports[index].id
  );

  let newReports = [...selectedReports];

  if (state) {
    newReports.push(allReports[index]);
  } else {
    newReports.splice(selectedIndex, 1);
  }

  setSelectedReports(newReports);
};

const lulosoftOrange = '#ef8133';
const lulosoftGreen = '#88b838';

const DeliverButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: lulosoftOrange,
    width: '20%',
    alignSelf: 'center',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: lulosoftGreen
    },
    '&:disabled': {
      backgroundColor: 'lightgray',
      color: 'white'
    }
  }
}))(Button);

function InvoiceDelivery(props: Props) {
  const classes = useStyles();
  const [selectedReports, setSelectedReports] = useState([] as Report[]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    moment()
      .add(2, 'weeks')
      .toDate()
  );

  return (
    <div className={classes.root}>
      <div className={classes.datePickers}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate as any}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate as any}
          />
        </MuiPickersUtilsProvider>
      </div>
      {props.reports.map((report: Report, i) => (
        <ReportDetails
          key={i}
          report={report}
          employee={
            props.employees.find(employee => employee.id === report.employeeId)!
          }
          index={i}
          onToggled={(state, index) =>
            updateSelectedReports(
              state,
              index,
              props.reports,
              selectedReports,
              setSelectedReports
            )
          }
        />
      ))}
      <DeliverButton
        disabled={selectedReports.length === 0}
        onClick={() => {
          props.onDeliverInvoice(
            startDate,
            endDate,
            selectedReports.map(report => report.id)
          );
        }}
      >
        Deliver
      </DeliverButton>
    </div>
  );
}

export default memo(InvoiceDelivery);
