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

interface Props {
  reports: Report[];
  employees: Employee[];
}

function InvoiceDelivery(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.reports.map((report: Report, i) => (
        <ReportDetails
          key={i}
          report={report}
          employee={
            props.employees.find(employee => employee.id === report.employeeId)!
          }
          index={i}
          onToggled={state => console.log(state)}
        />
      ))}
    </div>
  );
}

export default memo(InvoiceDelivery);
