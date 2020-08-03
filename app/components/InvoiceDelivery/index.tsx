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
}

const updateSelectedReports = (
  state,
  index,
  allReports,
  selectedReports,
  setSelectedReports
) => {
  let newReports = state
    ? [...selectedReports].concat(allReports[index])
    : [...selectedReports].splice(index, 1);

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
    }
  }
}))(Button);

function InvoiceDelivery(props: Props) {
  const classes = useStyles();
  const [selectedReports, setSelectedReports] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(moment().add(2, 'weeks'));

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
        onClick={() => {
          console.log(selectedReports);
        }}
      >
        Deliver
      </DeliverButton>
    </div>
  );
}

export default memo(InvoiceDelivery);
